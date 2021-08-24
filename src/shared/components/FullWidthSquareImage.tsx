import React from "react";
import { ReactNode } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Dimensions, Image, ImageBackground } from "react-native";

export default function FullWidthSquareImage({
  url,
  children,
}: {
  url: string;
  children?: ReactNode;
}) {
  const [{ imgWidth, imgHeight }, setSize] = useState({
    imgWidth: Dimensions.get("screen").width,
    imgHeight: Dimensions.get("screen").width,
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
