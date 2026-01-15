import uvicorn
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
import cv2
from io import BytesIO
from PIL import Image, UnidentifiedImageError
import base64

MODEL_PATH = "mars_unet_final.h5"  # nombre de modelo
IMG_SIZE = (256, 256) 

CLASSES = {
    0: "Suelo",
    1: "Roca",
    2: "Arena",
    3: "Roca Grande",
    4: "Fondo"
}

# Colores (R, G, B) para la visualización
COLORS = np.array([
    [128, 128, 128], # 0: Suelo (Gris)
    [200, 50, 50],   # 1: Roca (Rojo)
    [230, 200, 0],   # 2: Arena (Amarillo)
    [0, 200, 0],     # 3: Roca Grande (Verde)
    [0, 0, 0]        # 4: Fondo (Negro)
], dtype=np.uint8)

app = FastAPI()

# no recomendable
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Cargando modelo... esto puede tardar unos segundos...")
try:
    # compile=False es importante para evitar errores de versiones de optimizadores
    model = tf.keras.models.load_model(MODEL_PATH, compile=False)
    print("Modelo cargado exitosamente. Listo para recibir fotos de Marte.")
except Exception as e:
    print(f"Error fatal cargando el modelo: {e}")

def process_image(image_bytes):
    """Convierte bytes -> Tensor (1, 256, 256, 3)"""
    try:
        # Intentar abrir la imagen. Si falla, PIL lanzará error.
        image = Image.open(BytesIO(image_bytes)).convert("RGB")
        image = np.array(image)
        image_resized = cv2.resize(image, IMG_SIZE)
        input_tensor = np.expand_dims(image_resized / 255.0, axis=0)
        return input_tensor
    except UnidentifiedImageError:
        # Error específico: el archivo no es una imagen válida
        raise HTTPException(status_code=400, detail="El archivo subido no es una imagen válida o está corrupto.")
    except Exception as e:
        # Cualquier otro error procesando la imagen
        raise HTTPException(status_code=500, detail=f"Error procesando los píxeles de la imagen: {str(e)}")

def tensor_to_base64(mask_indices):
    """Pinta la máscara y la convierte a string base64"""
    mask_colored = COLORS[mask_indices]
    img_pil = Image.fromarray(mask_colored)
    buffered = BytesIO()
    img_pil.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{img_str}"

def analyze_viability(mask_indices):
    """
    Calcula la viabilidad usando reglas compuestas para detectar
    terrenos mixtos, dunas y campos de rocas.
    """
    total_pixels = mask_indices.size
    counts = np.bincount(mask_indices.flatten(), minlength=5)
    
    count_suelo = counts[0]       # Suelo
    count_roca = counts[1]        # Roca Pequeña/Lecho
    count_arena = counts[2]       # Arena
    count_roca_grande = counts[3] # Obstáculos
    count_fondo = counts[4]       
    
    total_terreno = total_pixels - count_fondo
    
    if total_terreno == 0:
        return "INCIERTO", "No se detectó terreno visible.", {
            "suelo": 0, "arena": 0, "rocas": 0, "obstacles": 0
        }

    # 2. Porcentajes Normalizados
    pct_suelo = (count_suelo / total_terreno) * 100
    pct_roca = (count_roca / total_terreno) * 100
    pct_arena = (count_arena / total_terreno) * 100
    pct_roca_grande = (count_roca_grande / total_terreno) * 100
    
    if pct_roca_grande > 5.0:
        status = "PELIGRO"
        msg = "Obstáculos críticos detectados. Riesgo de colisión."

    elif pct_arena > 50.0 and pct_roca < 20.0:
        status = "PELIGRO"
        msg = "Posible duna de arena profunda sin tracción. Alto riesgo de atascamiento."

    elif pct_arena > 30.0 and pct_roca > 30.0:
        status = "PRECAUCIÓN"
        msg = "Terreno inestable: Mezcla de arena y rocas sueltas. Tracción reducida."

    elif pct_roca > 50.0:
        status = "PRECAUCIÓN"
        msg = "Terreno altamente rugoso/abrasivo. Reducir velocidad para proteger ruedas."

    elif pct_arena > 30.0:
        status = "PRECAUCIÓN"
        msg = "Acumulaciones de arena detectadas. Monitorear deslizamiento."

    else:
        status = "VIABLE"
        msg = "Terreno mayormente firme y estable. Tránsito permitido."


    return status, msg, {
        "suelo": round(pct_suelo, 1),
        "arena": round(pct_arena, 1),
        "rocas": round(pct_roca, 1),       
        "obstacles": round(pct_roca_grande, 1)
    }

@app.get("/")
def home():
    return {"message": "API de Marte activa y escuchando..."}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    if model is None:
        raise HTTPException(
            status_code=503, 
            detail="El modelo de IA no está disponible en el servidor. Contacte al administrador."
        )
    
    try:
        image_bytes = await file.read()

        if len(image_bytes) == 0:
                raise HTTPException(status_code=400, detail="El archivo subido está vacío.")
        
        # pre-procesar
        input_tensor = process_image(image_bytes)
        
        # predecir
        prediction = model.predict(input_tensor)
        mask_indices = np.argmax(prediction, axis=-1)[0]
        
        # formatear respuesta
        mask_b64 = tensor_to_base64(mask_indices)
        status, msg, stats = analyze_viability(mask_indices)
        
        return {
            "filename": file.filename,
            "segmentation_map": mask_b64,
            "viability": {
                "status": status,
                "message": msg,
                "composition": stats
            }
        }
    except HTTPException as http_ex:
        raise http_ex
    except Exception as e:
        print(f"Error interno: {e}")
        raise HTTPException(
            status_code=500, 
            detail="Ocurrió un error interno analizando la imagen. Inténtelo de nuevo."
        )