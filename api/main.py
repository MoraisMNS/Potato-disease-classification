from fastapi import FastAPI,File, UploadFile
import uvicorn
import numpy as np 
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

MODEL = tf.keras.models.load_model("../models/1.keras")
CLASS_NAMES = ["Early Blight" , "Late Blight" , "Healthy"]

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

@app.get("/")
async def read_root():
    return {"message": "Welcome to the root URL"}

@app.get("/favicon.ico")
async def favicon():
    return {"message": "No favicon"}

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())

    img_batch = np.expand_dims(image,0)
    predictions = MODEL.predict(img_batch)

    predicted_class =  CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])

    return{
        'class' : predicted_class,
        'confidence' : float(confidence)
    }


    



if __name__ == "__main__":
    uvicorn.run(app, host='127.0.0.1', port=8000)