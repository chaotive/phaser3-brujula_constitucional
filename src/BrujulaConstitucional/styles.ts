import TextStyle = Phaser.Types.GameObjects.Text.TextStyle

const fontFamily = "Verdana";

export const stLogo: TextStyle = {
    fontFamily: "Garamond",
    fontSize: 29,
    color: "#ffffe6",
    align: "center",
    stroke: "#b38f00",
    strokeThickness: 3
    // backgroundColor: "#FFFF00"
}

export const stTitle: TextStyle = {
    fontFamily,
    fontSize: 34,
    color: "#d35400",
    // backgroundColor: "#FFFF00"
}

export const stText: TextStyle = {
    fontFamily,
    fontSize: 26,
    color: "#000000",
    // backgroundColor: "#FFFF00"
}

export const stButtonText: TextStyle = {
    fontFamily,
    fontSize: 34,
    color: "#0099FF",
    stroke: "#b38f00",
    strokeThickness: 3
    // backgroundColor: "#FFFF00"
}

export const stButtonTextSmall: TextStyle = {
    ...stButtonText,
    fontSize: 25,
}

export const stButtonTextSmall2: TextStyle = {
    ...stButtonText,
    fontSize: 21,
    color: "#d35400",
    stroke: "#000000",
    strokeThickness: 5
}

export const stResult: TextStyle = {
    fontFamily,
    fontSize: 34,
    color: "#FF0000",
    stroke: "#b38f00",
    strokeThickness: 3
    // backgroundColor: "#FFFF00"
}

export const stPreference: TextStyle = {
    fontFamily: "Courier",
    fontSize: 89,
    color: "#66ccff",
    align: "center",
    stroke: "#000000",
    strokeThickness: 5
    // backgroundColor: "#FFFF00"
}

export const stPreferenceIndeciso: TextStyle = {
    fontFamily: "Courier",
    fontSize: 55,
    color: "#ffcc99",
    align: "center",
    stroke: "#000000",
    strokeThickness: 5
    // backgroundColor: "#FFFF00"
}
