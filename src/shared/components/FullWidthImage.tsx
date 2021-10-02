import React, { useEffect, useState } from "react";
import { Dimensions, Image } from "react-native";

export default function FullWidthImage({ url }: { url: string }) {
    const [{ imgWidth, imgHeight }, setSize] = useState({
        imgWidth: 0,
        imgHeight: 0,
    });
    useEffect(() => {
        Image.getSize(url, (width, height) => {
            // calculate image width and height
            const screenWidth = Dimensions.get("screen").width;
            const scaleFactor = width / screenWidth;
            const imageHeight = height / scaleFactor;
            setSize({ imgWidth: screenWidth, imgHeight: imageHeight });
        });
    }, [url]);

    return <Image style={{ width: imgWidth, height: imgHeight }} source={{ uri: url }} />;
}
