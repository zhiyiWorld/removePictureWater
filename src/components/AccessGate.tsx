import { LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react';
import { type FormEvent, useState } from 'react';

type AccessGateProps = {
  errorMessage: string;
  onSubmit: (password: string) => Promise<void>;
};

export default function AccessGate({ errorMessage, onSubmit }: AccessGateProps) {
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    try {
      await onSubmit(password);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#050816] px-6 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,248,214,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(47,96,255,0.24),_transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-[0.28em] text-cyan-200/80 uppercase">
            <Sparkles className="h-4 w-4" />
            抖音去水印下载工作台
          </div>

          <div className="space-y-4">
            <h1 className="max-w-3xl font-['Noto_Serif_SC'] text-4xl font-semibold leading-tight text-white md:text-6xl">
              一次粘贴，直接拿到无水印视频和封面。
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              输入固定密码后，粘贴抖音分享文案或短链，系统会自动提取有效链接并解析标题、封面、视频地址，再由浏览器完成下载。
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['固定密码', '当前仅做轻量访问限制，免登录免注册'],
              ['自动提链', '从分享文案中匹配第一个 http/https 链接'],
              ['前端下载', '优先 Blob 下载，失败时自动兜底新窗口打开'],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
              >
                <p className="text-sm font-medium text-cyan-200">{title}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400">访问验证</p>
              <h2 className="text-xl font-semibold">输入固定密码进入</h2>
            </div>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block space-y-3">
              <span className="text-sm text-slate-300">访问密码</span>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <LockKeyhole className="h-5 w-5 text-cyan-200" />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  placeholder="请输入固定密码"
                  className="w-full bg-transparent text-base text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </label>

            {errorMessage ? (
              <p className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center rounded-2xl bg-cyan-300 px-4 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? '验证中...' : '进入下载工作台'}
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-400">
            当前方案不会暴露第三方接口秘钥到浏览器，请在服务端 `.env` 中填入 `API_KEY` 后使用。
          </div>
        </div>
      </div>
    </section>
  );
}
