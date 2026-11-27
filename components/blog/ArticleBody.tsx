import 'highlight.js/styles/github-dark.css';
import Markdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Link2, SquareTerminal, FileCode2 } from 'lucide-react';
import { createSlugger } from '@/lib/blog';
import { CodeCopyButton } from './CodeCopyButton';

/* eslint-disable @typescript-eslint/no-explicit-any */
type HastNode = { type: string; value?: string; tagName?: string; properties?: any; children?: HastNode[] };

function hastText(node?: HastNode): string {
  if (!node) return '';
  if (node.type === 'text') return node.value ?? '';
  return (node.children ?? []).map(hastText).join('');
}

/** Adds stable ids to h1–h3 in document order, using the same slugger as the TOC. */
function rehypeHeadingIds() {
  return (tree: HastNode) => {
    const slug = createSlugger();
    const walk = (node: HastNode) => {
      if (node.type === 'element' && /^h[1-3]$/.test(node.tagName ?? '')) {
        node.properties = { ...(node.properties ?? {}), id: slug(hastText(node)) };
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}

const SHELL = new Set(['bash', 'sh', 'shell', 'zsh', 'console', 'text', 'txt']);

function Heading({ as: Tag, id, children, className }: { as: 'h2' | 'h3'; id?: string; children: React.ReactNode; className: string }) {
  return (
    <Tag id={id} className={`group scroll-mt-28 ${className}`}>
      {children}
      {id && (
        <a
          href={`#${id}`}
          aria-label="Link to this section"
          className="ml-2 inline-flex align-middle text-white/0 transition-colors group-hover:text-white/35 hover:!text-white/70 focus-visible:text-white/70"
        >
          <Link2 className="h-4 w-4" />
        </a>
      )}
    </Tag>
  );
}

const h2Class = 'mt-14 mb-5 font-display text-2xl font-semibold leading-tight tracking-tight text-white md:text-[1.75rem]';
const h3Class = 'mt-10 mb-3 font-display text-xl font-semibold leading-snug tracking-tight text-white';

const components: Components = {
  // A post has exactly one <h1> (the title), so markdown h1s render as h2.
  h1: ({ node, children, id }) => <Heading as="h2" id={id} className={h2Class}>{children}</Heading>,
  h2: ({ node, children, id }) => <Heading as="h2" id={id} className={h2Class}>{children}</Heading>,
  h3: ({ node, children, id }) => <Heading as="h3" id={id} className={h3Class}>{children}</Heading>,
  h4: ({ node, ...props }) => <h4 {...props} className="mt-8 mb-2 font-display text-lg font-semibold text-white" />,
  p: ({ node, ...props }) => <p {...props} className="my-5 text-[17px] leading-[1.8] text-white/70" />,
  ul: ({ node, ...props }) => (
    <ul {...props} className="my-5 list-disc space-y-2 pl-6 text-[17px] leading-[1.75] text-white/70 marker:text-white/30" />
  ),
  ol: ({ node, ...props }) => (
    <ol {...props} className="my-5 list-decimal space-y-2 pl-6 text-[17px] leading-[1.75] text-white/70 marker:font-mono marker:text-sm marker:text-white/35" />
  ),
  li: ({ node, ...props }) => <li {...props} className="pl-1.5 [&>p]:my-1" />,
  strong: ({ node, ...props }) => <strong {...props} className="font-semibold text-white" />,
  em: ({ node, ...props }) => <em {...props} className="italic text-white/80" />,
  a: ({ node, href = '', ...props }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...props}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="font-medium text-white underline decoration-white/30 underline-offset-[5px] transition-colors hover:decoration-white"
      />
    );
  },
  blockquote: ({ node, ...props }) => (
    <blockquote
      {...props}
      className="my-8 rounded-r-xl border-l-2 border-white/30 bg-white/[0.03] px-5 py-1 text-white/75 [&>p]:my-3"
    />
  ),
  hr: () => <hr className="my-12 border-white/10" />,
  img: ({ node, src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === 'string' ? src : ''}
      alt={alt ?? ''}
      loading="lazy"
      decoding="async"
      className="my-8 w-full rounded-xl border border-white/10"
    />
  ),
  table: ({ node, ...props }) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-white/10">
      <table {...props} className="w-full border-collapse text-left text-[15px]" />
    </div>
  ),
  thead: ({ node, ...props }) => <thead {...props} className="bg-white/[0.04]" />,
  th: ({ node, ...props }) => (
    <th {...props} className="whitespace-nowrap border-b border-white/10 px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-white/50" />
  ),
  td: ({ node, ...props }) => <td {...props} className="border-b border-white/[0.06] px-4 py-3 align-top text-white/70" />,
  pre: ({ node, children }) => {
    const codeEl = (node as HastNode | undefined)?.children?.find((c) => c.tagName === 'code');
    const classes: string[] = codeEl?.properties?.className ?? [];
    const lang = classes.find((c) => c.startsWith('language-'))?.replace('language-', '') ?? '';
    const raw = hastText(codeEl).replace(/\n$/, '');
    const Icon = SHELL.has(lang) ? SquareTerminal : FileCode2;
    return (
      <figure className="code-block my-7 overflow-hidden rounded-xl border border-white/10 bg-[#0b0d14]">
        <figcaption className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.02] py-1.5 pl-4 pr-1.5">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {lang || 'code'}
          </span>
          <CodeCopyButton text={raw} />
        </figcaption>
        <pre className="overflow-x-auto p-4 text-[13.5px] leading-[1.7]">{children}</pre>
      </figure>
    );
  },
};

export function ArticleBody({ content }: { content: string }) {
  return (
    <div className="article-body">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHeadingIds, [rehypeHighlight, { detect: false, ignoreMissing: true }]]}
        components={components}
      >
        {content}
      </Markdown>
    </div>
  );
}
