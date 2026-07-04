import { Copy, Download, ExternalLink, FileImage, Film, Info } from 'lucide-react';
import type { ParseResult } from '../../shared/types';

type ResultCardProps = {
  errorMessage: string;
  noticeMessage: string;
  result: ParseResult | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  onCopy: (value: string, label: string) => Promise<void>;
  onDownloadCover: () => Promise<void>;
  onDownloadVideo: () => Promise<void>;
};

function FieldRow({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy: () => Promise<void>;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</p>
        <button
          type="button"
          onClick={() => void onCopy()}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-slate-300 transition hover:border-white/25 hover:text-white"
        >
          <Copy className="h-3.5 w-3.5" />
          复制
        </button>
      </div>
      <p className="mt-3 break-all text-sm leading-7 text-cyan-50">{value || '暂无'}</p>
    </div>
  );
}

export default function ResultCard({
  errorMessage,
  noticeMessage,
  result,
  status,
  onCopy,
  onDownloadCover,
  onDownloadVideo,
}: ResultCardProps) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">步骤 02</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">查看解析结果</h2>
        </div>
        <div className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
          状态：{status === 'idle' ? '待解析' : status === 'loading' ? '解析中' : status === 'success' ? '已完成' : '失败'}
        </div>
      </div>

      {status === 'loading' ? (
        <div className="mt-6 space-y-4">
          <div className="h-60 animate-pulse rounded-[28px] bg-white/5" />
          <div className="h-24 animate-pulse rounded-[24px] bg-white/5" />
          <div className="h-24 animate-pulse rounded-[24px] bg-white/5" />
        </div>
      ) : null}

      {status !== 'loading' && !result ? (
        <div className="mt-6 rounded-[28px] border border-dashed border-white/15 bg-white/[0.02] p-8 text-sm leading-7 text-slate-400">
          解析成功后，这里会展示标题、封面预览、视频地址和封面地址。你可以直接下载视频，也可以下载封面图片。
        </div>
      ) : null}

      {errorMessage ? (
        <div className="mt-6 rounded-[24px] border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-100">
          {errorMessage}
        </div>
      ) : null}

      {noticeMessage ? (
        <div className="mt-6 rounded-[24px] border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm text-cyan-50">
          {noticeMessage}
        </div>
      ) : null}

      {result ? (
        <div className="mt-6 space-y-4">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]">
            {result.cover ? (
              <img
                src={result.cover}
                alt={result.title}
                className="h-[320px] w-full object-cover"
              />
            ) : (
              <div className="flex h-[320px] items-center justify-center gap-3 text-slate-400">
                <Info className="h-5 w-5" />
                接口未返回封面图
              </div>
            )}
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100">
                <Film className="h-3.5 w-3.5" />
                {result.type}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-slate-300">
                <FileImage className="h-3.5 w-3.5" />
                已支持封面预览
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold leading-8 text-white">{result.title}</h3>
          </div>

          <FieldRow label="视频地址" value={result.url} onCopy={() => onCopy(result.url, '视频地址')} />
          <FieldRow label="封面地址" value={result.cover} onCopy={() => onCopy(result.cover, '封面地址')} />

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => void onDownloadVideo()}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              <Download className="h-4 w-4" />
              下载视频
            </button>

            <button
              type="button"
              onClick={() => void onDownloadCover()}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/25"
            >
              <FileImage className="h-4 w-4" />
              下载封面
            </button>

            <a
              href={result.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/25 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              打开视频地址
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
}
