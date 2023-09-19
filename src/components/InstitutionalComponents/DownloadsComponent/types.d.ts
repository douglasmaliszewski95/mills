interface DownloadsCardProps {
    file: string;
    title: string;
    subtitle: string;
    id?: number;
}

interface DownloadComponentProps {
    downloadCards: DownloadsCardProps[];
}

export { DownloadComponentProps, DownloadsCardProps }