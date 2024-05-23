import {useEffect, useMemo} from "react";

export const AudioPlayer = ({audioBase64}: {audioBase64: string}) => {

    useEffect(() => {
        const base64ToBlob = (base64: string, mime: string): Blob => {
            const byteCharacters = atob(base64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            return new Blob([byteArray], { type: mime });
        }

        if(audioBase64) {
            const mimeType = 'audio/wav';
            const base64Data = audioBase64.replace(/^data:audio\/\w+;base64,/, '');
            const audioBlob = base64ToBlob(base64Data, mimeType);
            const audioPlayer: HTMLAudioElement = document.getElementById('audioPlayer') as HTMLAudioElement;
            if(audioPlayer) {
                audioPlayer.src = URL.createObjectURL(audioBlob);
            }
        }
    }, [audioBase64])

    return <audio controls id="audioPlayer"></audio>
}
