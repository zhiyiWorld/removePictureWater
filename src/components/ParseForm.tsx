import { Link2, LoaderCircle, Search, Trash2 } from 'lucide-react';

type ParseFormProps = {
  extractedLink: string;
  loading: boolean;
  rawInput: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onSubmit: () => Promise<void>;
};

export default function ParseForm({
  extractedLink,
  loading,
  rawInput,
  onChange,
  onClear,
  onSubmit,
}: ParseFormProps) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">步骤 01</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">粘贴分享文案</h2>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-white/25 hover:text-white"
        >
          <Trash2 className="h-4 w-4" />
          清空
        </button>
      </div>

      <textarea
        value={rawInput}
        onChange={(event) => onChange(event.target.value)}
        rows={10}
        placeholder="把抖音分享文案完整粘贴到这里，系统会自动提取其中的链接。"
        className="mt-6 w-full rounded-[28px] border border-white/10 bg-white/5 px-5 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:bg-white/[0.07]"
      />

      <div className="mt-5 rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <Link2 className="h-4 w-4 text-cyan-200" />
          已提取链接
        </div>
        <p className="mt-3 break-all text-sm leading-7 text-cyan-50">
          {extractedLink || '还没有识别到有效链接'}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => void onSubmit()}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {loading ? '解析中...' : '开始解析'}
        </button>
        <div className="rounded-full border border-white/10 px-4 py-3 text-sm text-slate-400">
          支持分享文案、短链和完整链接
        </div>
      </div>
    </section>
  );
}
