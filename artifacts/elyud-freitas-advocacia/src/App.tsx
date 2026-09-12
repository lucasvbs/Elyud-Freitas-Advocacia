import { type FormEvent, useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Baby,
  Building2,
  Check,
  ChevronDown,
  Clock3,
  Crown,
  FileCheck2,
  FileText,
  Gavel,
  Handshake,
  HeartCrack,
  HeartHandshake,
  Home,
  KeyRound,
  Landmark,
  LockKeyhole,
  Menu,
  MessageCircle,
  Scale,
  ScrollText,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react';
import logo from './assets/logo.webp';
import adv01 from './assets/adv01.png';
import adv02 from './assets/adv02.png';
import adv03 from './assets/adv03.png';

const WHATSAPP_LINK =
  'https://wa.me/?text=' +
  encodeURIComponent('Olá, gostaria de entender meu caso com o Dr. Elyud Freitas.');

const navItems = [
  { label: 'Atuação', href: '#atuacao' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Dúvidas', href: '#duvidas' },
];

const painPoints = [
  'Medo de perder direitos por falta de orientação clara',
  'Insegurança sobre valor de pensão, partilha ou guarda dos filhos',
  'Contrato assinado sem entender de verdade as cláusulas',
  'Sensação de estar “mais um processo” numa fila de escritório',
  'Dúvida sobre o que pode ser feito sem sair de casa',
  'Receio de expor um assunto delicado da família',
];

const benefits = [
  {
    icon: MessageCircle,
    title: 'Atendimento 100% online',
    text: 'Você resolve tudo por WhatsApp, videochamada e assinatura digital, sem perder um dia de trabalho indo ao escritório.',
  },
  {
    icon: Sparkles,
    title: '+300 avaliações 5★ reais',
    text: 'Você contrata sabendo que outras pessoas passaram pela mesma dúvida e foram bem atendidas.',
  },
  {
    icon: Clock3,
    title: 'Resposta em até 24h úteis',
    text: 'Você não fica dias sem saber se seu caso foi sequer lido.',
  },
  {
    icon: LockKeyhole,
    title: 'Sigilo absoluto',
    text: 'Você fala de assuntos delicados da sua família com segurança total.',
  },
  {
    icon: Scale,
    title: 'Análise antes da contratação',
    text: 'Você decide com informação, não no escuro.',
  },
  {
    icon: FileCheck2,
    title: 'Pagamento flexível',
    text: 'Pix, transferência ou cartão parcelado para organizar o custo sem virar mais um peso na sua rotina.',
  },
];

type AreaCategory = 'todos' | 'familia' | 'imobiliario';

const practiceAreas = [
  {
    category: 'familia' as const,
    categoryLabel: 'Direito de Família',
    title: 'Direito de Família',
    text: 'Atuação em conflitos familiares com acolhimento, estratégia e proteção dos seus direitos.',
    icon: UsersRound,
  },
  {
    category: 'familia' as const,
    categoryLabel: 'Direito de Família',
    title: 'Divórcio',
    text: 'Divórcio consensual ou litigioso com discrição, agilidade e segurança patrimonial.',
    icon: HeartCrack,
  },
  {
    category: 'familia' as const,
    categoryLabel: 'Direito de Família',
    title: 'Alimentos',
    text: 'Fixação, revisão e execução de pensão alimentícia com foco na proteção familiar.',
    icon: Baby,
  },
  {
    category: 'familia' as const,
    categoryLabel: 'Direito de Família',
    title: 'Guarda e Visitas',
    text: 'Definição de guarda e convivência com atenção ao bem-estar da criança e segurança jurídica.',
    icon: Crown,
  },
  {
    category: 'familia' as const,
    categoryLabel: 'Direito de Família',
    title: 'União Estável',
    text: 'Reconhecimento, dissolução e regularização de união estável com proteção patrimonial.',
    icon: HeartHandshake,
  },
  {
    category: 'familia' as const,
    categoryLabel: 'Direito de Família',
    title: 'Inventário e Partilha',
    text: 'Inventário judicial e extrajudicial com orientação segura para divisão patrimonial.',
    icon: ScrollText,
  },
  {
    category: 'imobiliario' as const,
    categoryLabel: 'Imobiliário e Contratos',
    title: 'Direito Imobiliário',
    text: 'Assessoria em imóveis, contratos, regularização e defesa de interesses patrimoniais.',
    icon: Home,
  },
  {
    category: 'imobiliario' as const,
    categoryLabel: 'Imobiliário e Contratos',
    title: 'Compra e Venda',
    text: 'Negociações imobiliárias com análise documental e proteção jurídica em cada etapa.',
    icon: Handshake,
  },
  {
    category: 'imobiliario' as const,
    categoryLabel: 'Imobiliário e Contratos',
    title: 'Usucapião',
    text: 'Regularização de imóveis por posse com suporte jurídico ágil e documentação adequada.',
    icon: KeyRound,
  },
  {
    category: 'imobiliario' as const,
    categoryLabel: 'Imobiliário e Contratos',
    title: 'Regularização de Imóveis',
    text: 'Assessoria em escritura, registro, averbação e documentação de imóveis irregulares.',
    icon: Landmark,
  },
  {
    category: 'imobiliario' as const,
    categoryLabel: 'Imobiliário e Contratos',
    title: 'Locação e Despejo',
    text: 'Atuação em contratos de locação, inadimplência, despejo e defesa das partes envolvidas.',
    icon: Building2,
  },
  {
    category: 'imobiliario' as const,
    categoryLabel: 'Imobiliário e Contratos',
    title: 'Contratos',
    text: 'Elaboração, revisão e análise contratual para reduzir riscos e evitar prejuízos futuros.',
    icon: FileText,
  },
];

const testimonials = [
  ['“Atendimento com clareza e atenção, nota dez.”', 'Tony Marques'],
  ['“Muito diligente, atencioso, competente e confiável.”', 'Neire Rodrigues'],
  [
    '“A consultoria tirou todas as minhas dúvidas e ainda recebi um PDF explicando tudo.”',
    'Daliane Lima',
  ],
  [
    '“Atendimento profissional, transparente e com muita segurança jurídica em todo o processo.”',
    'Márcia Helena M. F. Almeida',
  ],
];

const faqs = [
  ['Como funciona o atendimento online?', 'Por videochamada, telefone e WhatsApp, com a mesma segurança de um atendimento presencial.'],
  ['Preciso comparecer ao escritório?', 'Não é necessário. Tudo pode ser feito à distância.'],
  ['Como envio meus documentos?', 'Por WhatsApp, e-mail ou canal indicado no atendimento — fotos ou arquivos legíveis.'],
  ['Como é feita a assinatura do contrato?', 'De forma digital, com validade jurídica, por plataforma segura.'],
  ['Como funciona o pagamento?', 'Combinado de forma transparente no início — Pix, transferência ou cartão parcelado.'],
  ['Meu caso será analisado antes de eu contratar?', 'Sim. Fazemos uma análise inicial e explicamos as possibilidades antes de qualquer decisão.'],
];

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useReveal();
  useEffect(() => {
    const timer = window.setInterval(() => {
      setValue((current) => {
        if (current >= target) {
          window.clearInterval(timer);
          return target;
        }
        return Math.min(target, current + Math.max(1, Math.ceil(target / 28)));
      });
    }, 32);
    return () => window.clearInterval(timer);
  }, [target]);
  return (
    <span ref={ref} className="count-in" data-testid={`text-counter-${target}`}>
      {value}
      {suffix}
    </span>
  );
}

function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <div className={`eyebrow flex items-center gap-3 ${light ? 'text-[#d9ae62]' : 'text-[#ab6f0d]'}`}>
      <span className="h-px w-8 bg-current" />
      {children}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeArea, setActiveArea] = useState<AreaCategory>('todos');
  const [submitted, setSubmitted] = useState(false);

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="grain overflow-hidden bg-[#f7f3eb] text-[#071941]">
      <header className="absolute left-0 right-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <a href="#inicio" className="block" data-testid="link-logo">
            <img src={logo} alt="Elyud Freitas Advocacia" className="h-auto w-[178px] object-contain sm:w-[210px]" />
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link text-xs font-semibold tracking-wide" data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
                {item.label}
              </a>
            ))}
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="outline-button rounded-sm px-5 py-3 text-xs font-bold" data-testid="link-header-whatsapp">
              Falar com o advogado
            </a>
          </nav>
          <button
            type="button"
            className="rounded-sm p-2 text-[#f7f3eb] lg:hidden"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mx-4 rounded-sm border border-[#ab6f0d]/30 bg-[#0a204e] p-5 shadow-2xl lg:hidden" aria-label="Menu mobile">
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMenu} className="text-sm text-[#f7f3eb]" data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
                  {item.label}
                </a>
              ))}
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="gold-button mt-1 rounded-sm px-4 py-3 text-center text-xs font-bold" data-testid="link-mobile-whatsapp">
                Falar com o advogado
              </a>
            </div>
          </nav>
        )}
      </header>

      <section id="inicio" className="relative min-h-[760px] overflow-hidden bg-[#071941] text-[#f7f3eb]">
        <div className="absolute -right-20 top-24 h-[480px] w-[480px] rounded-full border border-[#ab6f0d]/20 sm:right-[-100px] sm:h-[650px] sm:w-[650px]" />
        <div className="absolute -right-4 top-40 h-[320px] w-[320px] rounded-full border border-[#ab6f0d]/10 sm:right-[-10px] sm:h-[450px] sm:w-[450px]" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#071941] to-transparent" />
        <div className="relative mx-auto grid min-h-[760px] max-w-[1240px] items-center gap-12 px-5 pb-20 pt-40 sm:px-8 lg:grid-cols-[1.03fr_.97fr] lg:gap-20 lg:px-10 lg:pt-32">
          <div className="max-w-[680px]">
            <div className="reveal">
              <SectionLabel light>Advocacia em Brasília</SectionLabel>
            </div>
            <h1 className="reveal reveal-delay-1 serif mt-7 max-w-[680px] text-[clamp(3.25rem,7vw,6.6rem)] leading-[.93] tracking-[-.035em] text-[#f7f3eb]">
              +300 Avaliações <span className="text-[#d5a858]">5★</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-8 max-w-[590px] text-base leading-8 text-[#d8deea] sm:text-lg">
              Direito de Família e Imobiliário com ética, sigilo total e resposta em até 24h — presencial em Brasília ou 100% online para todo o Brasil.
            </p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="gold-button inline-flex items-center gap-3 rounded-sm px-6 py-4 text-sm font-bold" data-testid="link-hero-whatsapp">
                Falar com o advogado <ArrowRight size={17} />
              </a>
              <span className="text-xs text-[#aeb8c9]">Resposta em até 24h úteis • Sem compromisso</span>
            </div>
            <a href="#proposta" className="mt-16 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.16em] text-[#d9ae62]" data-testid="link-hero-scroll">
              Conheça a forma de cuidar <ArrowDown size={16} />
            </a>
          </div>
          <div className="relative hidden min-h-[500px] lg:block">
            <div className="absolute right-2 top-4 h-[470px] w-[360px] border border-[#ab6f0d]/40" />
            <div className="absolute right-10 top-12 h-[470px] w-[360px] bg-[#102855]/75" />
            <div className="absolute right-16 top-20 flex h-[470px] w-[360px] flex-col justify-between border-l border-[#d9ae62]/60 bg-[#0b214e] p-9 shadow-2xl">
              <div className="flex justify-between">
                <span className="eyebrow text-[#d9ae62]">E / F</span>
                <span className="text-xs text-[#8e9ab0]">01 — 06</span>
              </div>
              <div>
                <div className="mb-6 h-px w-12 bg-[#ab6f0d]" />
                <p className="serif text-4xl leading-tight text-[#f4e2bd]">Proteção para o que não pode esperar.</p>
              </div>
              <div className="flex items-end justify-between text-xs text-[#aeb8c9]">
                <span>Família · Patrimônio<br />Contratos</span>
                <ShieldCheck className="text-[#d9ae62]" size={32} strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="proposta" className="bg-[#f7f3eb] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1110px] gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div className="reveal">
            <SectionLabel>O ponto de partida</SectionLabel>
            <p className="serif mt-6 max-w-[310px] text-4xl leading-[1.08] text-[#071941]">Decisões importantes pedem um lugar seguro para começar.</p>
          </div>
          <div className="reveal reveal-delay-1 max-w-[680px] text-[#33415a]">
            <p className="text-xl leading-9 text-[#071941] sm:text-2xl sm:leading-10">Divórcio, guarda dos filhos, inventário, um contrato mal feito. São decisões que mexem com a vida da sua família e o seu patrimônio.</p>
            <p className="mt-7 leading-8">Nesses momentos, você não precisa só de alguém que “entende de leis”. Precisa de alguém que explique cada passo com clareza e cuide do seu caso com o mesmo cuidado que cuidaria do próprio.</p>
            <p className="mt-7 leading-8">É assim que o Dr. Elyud Freitas atua: mais de 300 avaliações 5 estrelas no Google, atendimento humanizado e total sigilo em cada etapa.</p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#071941] px-5 py-24 text-[#f7f3eb] sm:px-8 lg:px-10 lg:py-32">
        <div className="photo-section-glow absolute -right-32 top-12 h-80 w-80 rounded-full border border-[#d9ae62]/20" />
        <div className="relative mx-auto grid max-w-[1110px] items-center gap-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-24">
          <div className="reveal relative mx-auto w-full max-w-[480px] lg:mx-0">
            <div className="photo-frame absolute -bottom-5 -left-5 h-28 w-28 border-b border-l border-[#d9ae62]/80" />
            <div className="photo-frame absolute -right-5 -top-5 h-28 w-28 border-r border-t border-[#d9ae62]/80" />
            <figure className="relative overflow-hidden border border-[#d9ae62]/35 bg-[#102855] p-2 shadow-2xl">
              <img src={adv01} alt="Dr. Elyud Freitas em seu escritório" className="editorial-photo aspect-[1.03/1] w-full object-cover object-center" />
              <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-white/25 pt-3 text-[10px] uppercase tracking-[.16em] text-[#f4e2bd]">
                <span>Dr. Elyud Freitas</span>
                <span>Brasília · DF</span>
              </figcaption>
            </figure>
          </div>
          <div className="reveal reveal-delay-1">
            <SectionLabel light>Presença que orienta</SectionLabel>
            <h2 className="serif mt-6 max-w-[540px] text-5xl leading-[.98] text-[#f7f3eb] sm:text-6xl">A técnica fica mais forte quando existe escuta.</h2>
            <p className="mt-8 max-w-[580px] text-lg leading-8 text-[#cbd3df]">Cada caso tem uma história, um ritmo e uma preocupação diferente. Por isso, o atendimento começa entendendo o que realmente está em jogo para você.</p>
            <p className="mt-6 max-w-[540px] leading-8 text-[#aeb8c9]">A experiência do Dr. Elyud Freitas une estratégia jurídica, linguagem simples e proximidade em cada etapa — no escritório ou à distância.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              {['Escuta atenta', 'Estratégia clara', 'Sigilo total'].map((item) => (
                <span key={item} className="rounded-full border border-[#d9ae62]/35 px-4 py-2 text-xs font-semibold text-[#e4c582]">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e9e3d8] px-5 py-24 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1110px]">
          <div className="reveal flex flex-col justify-between gap-7 border-b border-[#071941]/15 pb-8 sm:flex-row sm:items-end">
            <div>
              <SectionLabel>Antes de decidir</SectionLabel>
              <h2 className="serif mt-5 max-w-[620px] text-4xl leading-[1.03] text-[#071941] sm:text-5xl">Escolher um advogado errado custa tempo, dinheiro e desgaste emocional.</h2>
            </div>
            <p className="max-w-[220px] text-sm leading-6 text-[#536077]">Principalmente quando o assunto envolve família ou patrimônio.</p>
          </div>
          <div className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {painPoints.map((point, index) => (
              <div key={point} className={`reveal reveal-delay-${(index % 3) + 1} flex gap-4 border-b border-[#071941]/15 py-6`}>
                <span className="mt-1 font-mono text-xs text-[#ab6f0d]">0{index + 1}</span>
                <p className="text-sm leading-6 text-[#26334b]">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="atuacao" className="relative overflow-hidden bg-[#071941] px-5 py-24 text-[#f7f3eb] sm:px-8 lg:px-10 lg:py-32">
        <div className="area-orbit area-orbit-one" />
        <div className="area-orbit area-orbit-two" />
        <div className="relative mx-auto max-w-[1110px]">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:gap-24">
            <div className="reveal">
              <SectionLabel light>Áreas de atuação</SectionLabel>
              <h2 className="serif mt-6 text-5xl leading-[.98] text-[#f7f3eb] sm:text-6xl">Clareza para saber exatamente o próximo passo.</h2>
              <div className="mt-9 h-px w-20 bg-[#ab6f0d]" />
            </div>
            <div className="reveal reveal-delay-1">
              <p className="max-w-[650px] text-lg leading-8 text-[#cbd3df]">Da proteção da sua família à segurança do seu patrimônio, cada orientação começa com uma escuta atenta e termina com um caminho claro.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {['Análise real', 'Linguagem simples', 'Acompanhamento contínuo'].map((item, index) => (
                  <div key={item} className="border-l border-[#ab6f0d] pl-4">
                    <span className="font-mono text-xs text-[#d9ae62]">0{index + 1}</span>
                    <p className="mt-3 text-sm font-semibold leading-5 text-[#f7f3eb]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2 mt-16 flex flex-col gap-5 border-y border-[#d9ae62]/20 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[420px] text-sm leading-6 text-[#aeb8c9]">Escolha uma frente para encontrar a orientação que faz sentido para o seu momento.</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar áreas de atuação">
              {[
                ['todos', 'Todas as áreas'],
                ['familia', 'Família'],
                ['imobiliario', 'Imobiliário e contratos'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={activeArea === value}
                  onClick={() => setActiveArea(value as AreaCategory)}
                  className={`area-filter rounded-full px-4 py-2 text-xs font-bold transition-colors ${activeArea === value ? 'area-filter-active' : ''}`}
                  data-testid={`button-area-filter-${value}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="area-grid mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {practiceAreas
              .filter((area) => activeArea === 'todos' || area.category === activeArea)
              .map(({ icon: Icon, title, text, categoryLabel }, index) => (
                <article key={title} className={`area-card reveal reveal-delay-${(index % 3) + 1} group flex min-h-[285px] flex-col justify-between p-6 sm:p-7`}>
                  <div>
                    <div className="area-icon flex h-12 w-12 items-center justify-center rounded-full border border-[#d9ae62]/55 bg-[#102855] text-[#d9ae62]">
                      <Icon size={22} strokeWidth={1.45} />
                    </div>
                    <p className="mt-7 font-mono text-[10px] uppercase tracking-[.16em] text-[#d9ae62]">{categoryLabel}</p>
                    <h3 className="serif mt-3 text-2xl leading-tight text-[#f7f3eb]">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#b6c1d2]">{text}</p>
                  </div>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="area-card-link mt-7 inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-[#e4c582]" data-testid={`link-area-${title.toLowerCase().replaceAll(' ', '-')}`}>
                    Falar sobre este tema <ArrowUpRight size={15} />
                  </a>
                </article>
              ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-[#f7f3eb] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1110px]">
          <div className="reveal max-w-[550px]">
            <SectionLabel>O que muda na prática</SectionLabel>
            <h2 className="serif mt-6 text-5xl leading-[.98] text-[#071941]">Um cuidado que acompanha a sua realidade.</h2>
          </div>
          <div className="mt-16 grid border-t border-[#071941]/15 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className={`reveal reveal-delay-${(index % 3) + 1} border-b border-[#071941]/15 py-8 md:nth-[odd]:border-r md:nth-[odd]:pr-10 lg:nth-[3n+1]:border-r lg:nth-[3n+1]:pr-10 lg:nth-[3n+2]:border-r lg:nth-[3n+2]:pr-10 lg:pl-8 lg:first:pl-0`}>
                <Icon size={25} strokeWidth={1.35} className="text-[#ab6f0d]" />
                <h3 className="mt-6 text-lg font-bold text-[#071941]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#59657a]">{text}</p>
              </article>
            ))}
          </div>
          <div className="reveal mt-14 flex flex-col gap-5 border-l-2 border-[#ab6f0d] bg-[#eee8dc] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="max-w-[650px] text-sm leading-7 text-[#26334b]">Atendimento mediante agendamento — vagas limitadas por semana para garantir dedicação real a cada caso.</p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#8d5909]" data-testid="link-benefits-whatsapp">Quero entender meu caso <ArrowRight size={16} /></a>
          </div>
        </div>
      </section>

      <section className="bg-[#e9e3d8] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1110px] items-center gap-14 lg:grid-cols-[1.08fr_.92fr] lg:gap-24">
          <div className="reveal order-2 grid grid-cols-2 gap-3 sm:gap-5 lg:order-1">
            <figure className="photo-tile photo-tile-tall overflow-hidden border border-[#071941]/15 bg-[#f7f3eb] p-2 shadow-xl">
              <img src={adv02} alt="Atendimento jurídico online com análise de documentos" className="editorial-photo h-full min-h-[310px] w-full object-cover object-center sm:min-h-[430px]" />
              <figcaption className="photo-caption">Análise cuidadosa</figcaption>
            </figure>
            <figure className="photo-tile mt-10 overflow-hidden border border-[#071941]/15 bg-[#f7f3eb] p-2 shadow-xl sm:mt-16">
              <img src={adv03} alt="Dr. Elyud Freitas trabalhando em atendimento online" className="editorial-photo aspect-[.96/1] w-full object-cover object-center" />
              <figcaption className="photo-caption">Atendimento próximo</figcaption>
            </figure>
          </div>
          <div className="reveal reveal-delay-1 order-1 lg:order-2">
            <SectionLabel>Atendimento sem distância</SectionLabel>
            <h2 className="serif mt-6 max-w-[480px] text-5xl leading-[.98] text-[#071941] sm:text-6xl">Tecnologia para aproximar, não para afastar.</h2>
            <p className="mt-8 max-w-[510px] text-lg leading-8 text-[#33415a]">Você pode receber orientação jurídica segura sem interromper sua rotina. Documentos, reuniões e decisões importantes cabem em um atendimento online organizado e humano.</p>
            <div className="mt-9 border-l-2 border-[#ab6f0d] pl-5">
              <p className="text-sm leading-7 text-[#536077]">Do primeiro contato à assinatura digital, você sabe quem está cuidando do seu caso e qual é o próximo passo.</p>
            </div>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="gold-button mt-10 inline-flex items-center gap-3 rounded-sm px-6 py-4 text-sm font-bold" data-testid="link-online-service-whatsapp">
              Agendar uma conversa <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section id="depoimentos" className="bg-[#e9e3d8] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1110px]">
          <div className="reveal flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <SectionLabel>Quem já confiou</SectionLabel>
              <h2 className="serif mt-5 text-5xl leading-[.98] text-[#071941]">A confiança aparece nos detalhes.</h2>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="serif text-4xl text-[#ab6f0d]"><AnimatedNumber target={300} suffix="+" /></p>
                <p className="mt-1 text-[10px] uppercase tracking-[.16em] text-[#536077]">avaliações 5★</p>
              </div>
              <div>
                <p className="serif text-4xl text-[#ab6f0d]"><AnimatedNumber target={315} /></p>
                <p className="mt-1 text-[10px] uppercase tracking-[.16em] text-[#536077]">verificadas</p>
              </div>
            </div>
          </div>
          <div className="mt-14 grid gap-4 lg:grid-cols-4">
            {testimonials.map(([quote, author], index) => (
              <blockquote key={author} className={`reveal reveal-delay-${(index % 3) + 1} flex min-h-[245px] flex-col justify-between border border-[#071941]/15 bg-[#f7f3eb] p-6 transition-transform duration-300 hover:-translate-y-1`}>
                <div>
                  <div className="flex gap-1 text-[#ab6f0d]" aria-label="Avaliação 5 estrelas">
                    {[1, 2, 3, 4, 5].map((star) => <span key={star}>★</span>)}
                  </div>
                  <p className="mt-8 text-[15px] leading-7 text-[#26334b]">{quote}</p>
                </div>
                <footer className="mt-8 border-t border-[#071941]/10 pt-4 text-xs font-bold text-[#071941]">— {author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3eb] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1110px] gap-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div className="reveal">
            <SectionLabel>O que você recebe</SectionLabel>
            <h2 className="serif mt-6 text-5xl leading-[.98] text-[#071941]">Informação antes de qualquer decisão.</h2>
            <p className="mt-7 max-w-[330px] text-sm leading-7 text-[#59657a]">Investimento sob orçamento, de acordo com a complexidade do caso — combinado com transparência total antes de qualquer contratação.</p>
          </div>
          <div className="reveal reveal-delay-1">
            <div className="divide-y divide-[#071941]/15 border-y border-[#071941]/15">
              {['Análise inicial do seu caso (família, imobiliário ou contratos)', 'Orientação clara sobre direitos e caminhos possíveis', 'Acompanhamento humanizado em cada etapa do processo', 'Assinatura digital de contratos e documentos, com validade jurídica'].map((item, index) => (
                <div key={item} className="flex gap-5 py-5">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ab6f0d] text-[#fffaf1]"><Check size={13} /></span>
                  <p className="text-sm leading-6 text-[#26334b]">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <p className="eyebrow text-[#ab6f0d]">Como funciona</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-4">
                {['Você chama no WhatsApp e conta seu caso', 'Recebe uma análise inicial e as opções possíveis', 'Decide se quer seguir — sem pressão', 'Acompanhamento contínuo até a solução'].map((item, index) => (
                  <div key={item} className="relative">
                    <span className="font-mono text-xs text-[#ab6f0d]">0{index + 1}</span>
                    <p className="mt-2 text-xs leading-5 text-[#59657a]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#102855] px-5 py-24 text-[#f7f3eb] sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1110px]">
          <div className="reveal grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <div>
              <SectionLabel light>O que costuma preocupar</SectionLabel>
              <h2 className="serif mt-6 text-5xl leading-[.98] text-[#f7f3eb]">Você pergunta. A gente responde com clareza.</h2>
            </div>
            <div className="space-y-7 text-sm leading-7 text-[#cbd3df]">
              <p><strong className="text-[#f7f3eb]">Mas preciso ir até o escritório?</strong><br />Não. Todo o atendimento, envio de documentos e assinatura de contrato pode ser feito à distância, com a mesma validade jurídica.</p>
              <p><strong className="text-[#f7f3eb]">Mas terei que expor documentos sensíveis pela internet?</strong><br />Você envia por WhatsApp, e-mail ou canal seguro indicado no atendimento — com sigilo garantido em cada etapa.</p>
              <p><strong className="text-[#f7f3eb]">Mas e se eu não gostar ou não fechar depois da análise?</strong><br />Sem problema. A análise inicial existe justamente pra você decidir com clareza, sem compromisso.</p>
              <p><strong className="text-[#f7f3eb]">Mas advogado é caro e eu não sei se cabe no meu orçamento?</strong><br />O pagamento é combinado de forma transparente desde o início, com Pix, transferência ou cartão parcelado.</p>
              <p><strong className="text-[#f7f3eb]">Mas quanto tempo demora pra alguém me responder?</strong><br />Retorno inicial no mesmo dia ou em até 24h úteis, dependendo da demanda.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="duvidas" className="bg-[#f7f3eb] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1110px] gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div className="reveal">
            <SectionLabel>Perguntas frequentes</SectionLabel>
            <h2 className="serif mt-6 text-5xl leading-[.98] text-[#071941]">Ainda ficou uma dúvida?</h2>
            <p className="mt-7 max-w-[300px] text-sm leading-7 text-[#59657a]">Encontre aqui respostas diretas para as primeiras perguntas que costumam surgir.</p>
          </div>
          <div className="reveal reveal-delay-1 border-t border-[#071941]/15">
            {faqs.map(([question, answer], index) => {
              const open = openFaq === index;
              return (
                <div key={question} className="border-b border-[#071941]/15">
                  <button type="button" className="flex w-full items-center justify-between gap-5 py-6 text-left text-sm font-bold text-[#071941]" onClick={() => setOpenFaq(open ? null : index)} aria-expanded={open} data-testid={`button-faq-${index}`}>
                    {question}
                    <ChevronDown size={19} className={`shrink-0 text-[#ab6f0d] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`faq-content ${open ? 'open' : ''}`}><div><p className="pb-6 pr-8 text-sm leading-7 text-[#59657a]">{answer}</p></div></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#ab6f0d] px-5 py-24 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1110px] gap-12 lg:grid-cols-[1fr_.92fr] lg:items-center lg:gap-24">
          <div className="reveal">
            <p className="eyebrow text-[#071941]">O próximo passo pode ser simples</p>
            <h2 className="serif mt-6 max-w-[620px] text-5xl leading-[.96] text-[#fffaf1] sm:text-6xl">Sua família e seu patrimônio merecem prioridade.</h2>
            <p className="mt-7 max-w-[550px] text-base leading-7 text-[#fff1d6]">Não como mais um número. Fale com o Dr. Elyud Freitas.</p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="mt-9 inline-flex items-center gap-3 rounded-sm bg-[#071941] px-6 py-4 text-sm font-bold text-[#f7f3eb] transition-transform duration-300 hover:-translate-y-1" data-testid="link-final-whatsapp">
              Falar com o Dr. Elyud Freitas <ArrowRight size={17} />
            </a>
            <p className="mt-4 text-xs text-[#fff1d6]">Resposta em até 24h úteis • Atendimento em todo o Brasil</p>
          </div>
          <div className="reveal reveal-delay-1 border border-[#f6d69e]/60 bg-[#b97a16] p-7 sm:p-9">
            {submitted ? (
              <div className="py-10 text-center">
                <Check className="mx-auto text-[#071941]" size={34} />
                <h3 className="serif mt-5 text-3xl text-[#fffaf1]">Mensagem recebida.</h3>
                <p className="mt-3 text-sm leading-6 text-[#fff1d6]">Você também pode falar diretamente pelo WhatsApp para contar seu caso.</p>
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 font-bold text-[#071941]" data-testid="link-form-success-whatsapp">Abrir WhatsApp <ArrowRight size={15} /></a>
              </div>
            ) : (
              <form onSubmit={submitForm} className="space-y-5">
                <div>
                  <p className="eyebrow text-[#071941]">Se preferir, escreva</p>
                  <h3 className="serif mt-4 text-3xl text-[#fffaf1]">Conte brevemente o que você precisa.</h3>
                </div>
                <label className="block">
                  <span className="sr-only">Seu nome</span>
                  <input required name="name" type="text" placeholder="Seu nome" className="w-full border-b border-[#f6d69e]/70 bg-transparent px-0 py-3 text-sm text-[#fffaf1] placeholder:text-[#f9dca6] focus:border-[#071941] focus:outline-none" data-testid="input-contact-name" />
                </label>
                <label className="block">
                  <span className="sr-only">Como podemos ajudar?</span>
                  <textarea required name="message" rows={3} placeholder="Como podemos ajudar?" className="w-full resize-none border-b border-[#f6d69e]/70 bg-transparent px-0 py-3 text-sm text-[#fffaf1] placeholder:text-[#f9dca6] focus:border-[#071941] focus:outline-none" data-testid="input-contact-message" />
                </label>
                <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-[#fff1d6]">
                  <input required type="checkbox" className="mt-1 h-4 w-4 accent-[#071941]" data-testid="input-lgpd-consent" />
                  <span>Li e concordo com o tratamento dos meus dados conforme a <a href="https://elyud.adv.br/politica-de-privacidade" target="_blank" rel="noreferrer" className="font-bold underline" data-testid="link-privacy-policy">Política de Privacidade</a>.</span>
                </label>
                <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#071941] px-5 py-4 text-sm font-bold text-[#f7f3eb] transition-colors hover:bg-[#102855]" data-testid="button-submit-contact">
                  Enviar mensagem <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#071941] px-5 py-14 text-[#f7f3eb] sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1110px] flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <img src={logo} alt="Elyud Freitas Advocacia" className="h-auto w-[210px]" data-testid="img-footer-logo" />
            <p className="mt-5 max-w-[320px] text-xs leading-6 text-[#aeb8c9]">Direito de Família e Imobiliário com ética, sigilo total e orientação clara.</p>
          </div>
          <div className="flex flex-col gap-4 text-xs text-[#aeb8c9] sm:items-end">
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold text-[#d9ae62]" data-testid="link-footer-whatsapp"><MessageCircle size={15} /> Falar pelo WhatsApp</a>
            <span>© Elyud Freitas Advocacia</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;