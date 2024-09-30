interface SettingsType {
    hex: string
}

export class Color{
    private readonly hex: string;
    constructor(settings: SettingsType){
        this.hex = settings.hex;
    }
}
