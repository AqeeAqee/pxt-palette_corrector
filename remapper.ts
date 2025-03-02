enum ScreenType{
    ST7735IPS
}

/**
 * 
 */
namespace color {
    let _div = 3.1
    let _offset = 164 // 256 * (div - 1) / div
    const _buf=Buffer.create(16*3)

    //% weight=102
    //% block
    export function setDiv(div:number){
        if (div < 1) div = 1
        _div=div
        _offset = 256 * (div - 1) / div
        correctPalette()
    }

    //% weight=101
    //% block
    export function setOffset(offset:number){
        _offset=offset
        correctPalette()
    }

    /**
     * Correct colors for custom replaced hardware screen, by remap color Red&Green&Blue values. 
     * eg. ST7735IPS screen
     */
    //% screenType.defl=ScreenType.ST7735IPS
    //% weight=103
    //% block="Correct colors for $screenType screen"
    export function correctPalette(screenType=ScreenType.ST7735IPS) {
        // info.setLife(_div * 10)
        // info.setScore(_offset)
        const p=color.currentPalette()
        for (let i = 1; i < 16; i++) {
            let rgb = color.RGB.fromHexValue(p.color(i))
            // color.setColor(i, color.rgb(rgb.red / _div + _offset, rgb.green / _div + _offset, rgb.blue / _div + _offset))
            _buf.setUint8(i*3, rgb.red / _div + _offset)
            _buf.setUint8(i*3+1, rgb.green / _div + _offset)
            _buf.setUint8(i*3+2, rgb.blue / _div + _offset)
        }
        image.setPalette(_buf)
        // bg.print(color.currentPalette().buf.toHex(),0,0,2)
    }

}