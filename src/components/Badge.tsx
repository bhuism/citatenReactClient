import React, {useEffect, useState} from "react";

interface BadgeProps {
    url: string;
}

export const Badge: React.FC<BadgeProps> = (props: BadgeProps) => {

    const [image, setImage] = useState(props.url);

    useEffect(() => {
        setInterval(() => {
            setImage(props.url + '#' + Date.now());
        }, 15 * 1000);
    }, [props])


    return <img src={image} alt='Version badge'/>;

}
