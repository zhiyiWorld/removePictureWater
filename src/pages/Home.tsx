import { WandSparkles } from 'lucide-react';
import type { ParseResponse, VerifyPasswordResponse } from '../../shared/types';
import AccessGate from '@/components/AccessGate';
import ParseForm from '@/components/ParseForm';
import ResultCard from '@/components/ResultCard';
import { useAppStore } from '@/store/useAppStore';
import { parseLink, verifyPassword } from '@/utils/api';
import { downloadAsset } from '@/utils/download';
import { extractFirstHttpUrl } from '@/utils/extractLink';

function getErrorMessage(error: unknown, fallback: string) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  return fallback;
}

export default function Home() {
  const {
    verified,
    rawInput,
    extractedLink,
    parseResult,
    parseStatus,
    errorMessage,
    noticeMessage,
    setVerified,
    setRawInput,
    setExtractedLink,
    setParseResult,
    setParseStatus,
    setErrorMessage,
    setNoticeMessage,
    resetResult,
  } = useAppStore();

  async function handleVerify(password: string) {
    setErrorMessage('');

    try {
      const response = await verifyPassword({ password });
      const payload = response as VerifyPasswordResponse;

      if (!payload.success) {
        throw payload;
      }

      setVerified(true);
      setNoticeMessage('验证通过，开始粘贴分享文案吧。');
    } catch (error) {
      setErrorMessage(getErrorMessage(error, '验证失败，请稍后重试'));
      throw error;
    }
  }

  async function handleParse() {
    const link = extractFirstHttpUrl(rawInput);

    setExtractedLink(link);
    setParseResult(null);
    setErrorMessage('');
    setNoticeMessage('');

    if (!rawInput.trim()) {
      setParseStatus('error');
      setErrorMessage('请先粘贴分享文案或短链');
      return;
    }

    if (!link) {
      setParseStatus('error');
      setErrorMessage('未识别到有效的 http 或 https 链接');
      return;
    }

    setParseStatus('loading');

    try {
      const response = await parseLink({ link });
      const payload = response as ParseResponse;

      if (!payload.success || !payload.data) {
        throw payload;
      }

      setParseResult(payload.data);
      setParseStatus('success');
      setNoticeMessage('解析完成，可以下载视频和封面了。');
    } catch (error) {
      setParseStatus('error');
      setErrorMessage(getErrorMessage(error, '解析失败，请稍后重试'));
    }
  }

  async function handleCopy(value: string, label: string) {
    if (!value) {
      setNoticeMessage(`${label}为空，无法复制`);
      return;
    }

    await navigator.clipboard.writeText(value);
    setNoticeMessage(`${label}已复制到剪贴板`);
  }

  async function handleDownloadVideo() {
    if (!parseResult?.url) {
      setNoticeMessage('当前没有可下载的视频地址');
      return;
    }

    const result = await downloadAsset(parseResult.url, 'douyin-video.mp4');
    setNoticeMessage(result.message);
  }

  async function handleDownloadCover() {
    if (!parseResult?.cover) {
      setNoticeMessage('当前没有可下载的封面地址');
      return;
    }

    const result = await downloadAsset(parseResult.cover, 'douyin-cover.jpg');
    setNoticeMessage(result.message);
  }

  function handleClear() {
    setRawInput('');
    resetResult();
  }

  if (!verified) {
    return <AccessGate errorMessage={errorMessage} onSubmit={handleVerify} />;
  }

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-200/80">
              <WandSparkles className="h-4 w-4" />
              去水印下载面板
            </div>
            <h1 className="mt-4 font-['Noto_Serif_SC'] text-3xl font-semibold leading-tight md:text-5xl">
              从分享文案提取链接，直接解析资源。
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              当前页面只做轻量访问控制。请确保服务端已配置 `API_KEY`，然后粘贴分享文本开始解析。
            </p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <ParseForm
            extractedLink={extractedLink}
            loading={parseStatus === 'loading'}
            rawInput={rawInput}
            onChange={setRawInput}
            onClear={handleClear}
            onSubmit={handleParse}
          />

          <ResultCard
            errorMessage={errorMessage}
            noticeMessage={noticeMessage}
            result={parseResult}
            status={parseStatus}
            onCopy={handleCopy}
            onDownloadCover={handleDownloadCover}
            onDownloadVideo={handleDownloadVideo}
          />
        </div>
      </div>
    </main>
  );
}
