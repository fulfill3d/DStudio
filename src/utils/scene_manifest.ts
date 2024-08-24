export const scene_manifest = {
    collisionsEnabled: true,
    clearColor: [255, 255, 255, 1],
    camera : {
        name: 'mug_camera',
        type: 'ArcRotateCamera',
        alpha: 300,
        beta: 60,
        radius: 5,
        target: [0,1,0],
        upperRadiusLimit: 5,
        lowerRadiusLimit: 5,
        upperBetaLimit: 90,
        lowerBetaLimit: 40
    },
    lights : [
        {
            type: 'HemisphericLight',
            name: 'Light1',
            direction: [0, -1, 0],
            intensity: 1.0
        },
        {
            type: 'HemisphericLight',
            name: 'Light2',
            direction: [0, 1, 0],
            intensity: 1.0
        }
    ]
}
