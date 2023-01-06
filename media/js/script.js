// const video = document.getElementById('videoInput')


// Promise.all([
//     faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//     faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//     faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
// ]).then(start)

// function start() {
//     document.body.append('Models loaded');

//     video.src = '../videos/speech.mp4'
//     recognizeFaces();
// }

// async function recognizeFaces() {

//     const labeledDescriptors = await loadLabeledImages()
//     const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6)
//     video.addEventListener('play', () => {
//         console.log('playing');
//         const canvas = faceapi.createCanvasFromMedia(video)
//         document.body.append(canvas)
//         const displaySize = { width: video.width, height: video.height }
//         faceapi.matchDimensions(canvas, displaySize)

//         setInterval(async () => {
//             const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();

//             const resizedDetection = faceapi.resizeResults(detections, displaySize);
//             canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

//             const results = resizedDetection.map((d) => {
//                 return faceMatcher.findBestMatch(d.descriptor)
//             })

//             results.forEach((result, i) => {
//                 const box = resizedDetection[i].detection.box
//                 const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
//                 drawBox.draw(canvas)
//             })
//         }, 100)
//     })
// }

// function loadLabeledImages() {
//     const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Iron Man', 'Jim Rhodes', 'Prashant Kumar', 'Thor', 'Tony Stark']
//     return Promise.all(
//         labels.map(async (label) => {
//             const descriptions = []
//             for (let i = 1; i <= 2; i++) {
//                 const img = await faceapi.fetchImage(`../labeled_images/${label}/${i}.jpg`)
//                 const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
//                 descriptions.push(detections.descriptor)
//             }
//             document.body.append(label + ' Faces Loaded | ')
//             return new faceapi.LabeledFaceDescriptors(label, descriptions)
//         })
//     )
// }

const video = document.getElementById('videoInput')

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('./media/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./media/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('./media/models') //heavier/accurate version of tiny face detector
]).then(start)

function start() {
    document.body.append('Models Loaded')
    
    navigator.getUserMedia(
        { video:{} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
    
    //video.src = '../videos/speech.mp4'
    console.log('video added')
    recognizeFaces()
}

async function recognizeFaces() {

    const labeledDescriptors = await loadLabeledImages()
    console.log(labeledDescriptors)
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7)


    video.addEventListener('play', async () => {
        console.log('Playing')
        const canvas = faceapi.createCanvasFromMedia(video)
        document.body.append(canvas)

        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)

        

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()

            const resizedDetections = faceapi.resizeResults(detections, displaySize)

            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

            const results = resizedDetections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })
            results.forEach( (result, i) => {
                const box = resizedDetections[i].detection.box
                const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                drawBox.draw(canvas)
            })
        }, 100)


        
    })
}


function loadLabeledImages() {
    //const labels = ['Black Widow', 'Captain America', 'Hawkeye' , 'Jim Rhodes', 'Tony Stark', 'Thor', 'Captain Marvel']
    const labels = ['Prashant Kumar','Gowtham'] // for WebCam
    return Promise.all(
        labels.map(async (label)=>{
            const descriptions = []
            for(let i=1; i<=2; i++) {
                const img = await faceapi.fetchImage(`../labeled_images/${label}/${i}.jpg`)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                console.log(label + i + JSON.stringify(detections))
                descriptions.push(detections.descriptor)
            }
            document.body.append(label+' Faces Loaded | ')
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}