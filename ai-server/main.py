
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import cv2
import numpy as np
import base64
import json
import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock Emotion Weights
EMOTIONS = ["Happy", "Neutral", "Surprised", "Focused", "Concerned"]

@app.get("/")
async def root():
    return {"status": "online", "message": "AI Interview Engine v1.2 Active"}

@app.websocket("/ws/analyze")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Receive image data from frontend (base64)
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Extract image if present
            image_data = message.get("image")
            if image_data:
                # Decode base64 to OpenCV image
                encoded_data = image_data.split(',')[1]
                nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
                img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

                # Process: Face Detection (Mocking OpenCV logic for performance)
                # In a real scenario, we'd use cv2.CascadeClassifier or MediaPipe
                face_detected = True 
                eye_contact = np.random.randint(70, 95)
                emotion = EMOTIONS[np.random.randint(0, len(EMOTIONS))]
                confidence = np.random.randint(60, 90)

                # Send results back
                await websocket.send_text(json.dumps({
                    "face_detected": face_detected,
                    "eye_contact": eye_contact,
                    "emotion": emotion,
                    "confidence": confidence,
                    "landmarks": [] # Mock landmarks
                }))
            
            await asyncio.sleep(0.1) # Throttle to 10 FPS
    except WebSocketDisconnect:
        print("Client disconnected")

@app.post("/verify-face")
async def verify_face(payload: dict):
    # Receive base64 image
    image_data = payload.get("image")
    if not image_data:
        return {"verified": False, "error": "No image data provided"}

    try:
        # Decode base64 to verify it's a valid image
        encoded_data = image_data.split(',')[1] if ',' in image_data else image_data
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            return {"verified": False, "error": "Invalid image data"}

        # Simulate face detection/verification
        # In production, use deepface or face_recognition libraries
        # For now, if we can decode the image, we'll consider it "verified" if a face is detected
        # (Mocking detection for this demo)
        face_detected = True 
        
        return {
            "verified": face_detected,
            "confidence": 0.98 if face_detected else 0.0,
            "message": "Identity Verified" if face_detected else "No Face Detected"
        }
    except Exception as e:
        return {"verified": False, "error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
