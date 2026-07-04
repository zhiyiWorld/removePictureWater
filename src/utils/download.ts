type DownloadResult = {
  success: boolean;
  message: string;
};

function triggerBrowserDownload(url: string, filename: string) {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export async function downloadAsset(url: string, filename: string): Promise<DownloadResult> {
  if (!url) {
    return {
      success: false,
      message: '资源地址为空，无法下载',
    };
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`下载失败：${response.status}`);
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    triggerBrowserDownload(objectUrl, filename);
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);

    return {
      success: true,
      message: '下载已开始',
    };
  } catch (_error) {
    window.open(url, '_blank', 'noopener,noreferrer');

    return {
      success: true,
      message: '资源已在新窗口打开，可直接保存',
    };
  }
}
