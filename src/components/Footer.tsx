export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10 py-12 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-white/40 text-sm mb-4">
          This website is not affiliated with, endorsed by, or connected to
          Anthropic, PBC. It is an independent initiative by European citizens
          who believe in responsible AI development.
        </p>
        <a
          href="https://www.anthropic.com/news/anthropics-response-to-the-us-ai-action-plan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-anthropic-terra/70 hover:text-anthropic-terra text-sm underline underline-offset-4 transition-colors"
        >
          Read Anthropic's original statement
        </a>
        <p className="mt-6 font-mono text-xs text-white/20">
          &copy; {new Date().getFullYear()} claudetoeu.com
        </p>
      </div>
    </footer>
  );
}
