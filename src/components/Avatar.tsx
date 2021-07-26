import React from "react";

interface AvatarProps {
	imageData: string;
}

export const Avatar = ({ imageData }: AvatarProps) => (
	<div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-full">
		<img src={`data:image/svg+xml;utf8,${imageData}`} />
	</div>
);
