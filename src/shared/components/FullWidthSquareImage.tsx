import React from "react";
import { ReactNode } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Dimensions, Image, ImageBackground } from "react-native";

export default function FullWidthSquareImage({
    url,
    padding,
    children,
}: {
    url: string;
    padding?: number;
    children?: ReactNode;
}) {
    const [{ imgWidth, imgHeight }, setSize] = useState({
        imgWidth: Dimensions.get("screen").width - (padding || 0) * 2,
        imgHeight: Dimensions.get("screen").width - (padding || 0) * 2,
    });

    return (
        <ImageBackground
            style={{ width: imgWidth, height: imgHeight }}
            resizeMode="cover"
            source={{ uri: url }}
        >
            {children}
        </ImageBackground>
    );
}
