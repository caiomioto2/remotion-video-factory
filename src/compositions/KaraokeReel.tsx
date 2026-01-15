import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Audio,
  staticFile,
} from "remotion";

// Types for video script structure
interface Segment {
  text: string;
  duration: number;
  visual: string;
}

interface VideoScript {
  hook: Segment;
  body: Segment[];
  cta: Segment;
  metadata: {
    total_duration: number;
    hook_pattern: string;
    hashtags: string[];
  };
}

// Karaoke text component with word-by-word animation
const KaraokeText: React.FC<{
  text: string;
  startFrame: number;
  durationFrames: number;
}> = ({ text, startFrame, durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");
  const framesPerWord = durationFrames / words.length;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
        padding: "40px",
        maxWidth: "900px",
      }}
    >
      {words.map((word, index) => {
        const wordStartFrame = startFrame + index * framesPerWord;
        const isActive = frame >= wordStartFrame;
        const isCurrentWord = frame >= wordStartFrame && frame < wordStartFrame + framesPerWord;

        const scale = isCurrentWord
          ? spring({
              frame: frame - wordStartFrame,
              fps,
              config: { damping: 12, stiffness: 200 },
            })
          : 1;

        const opacity = interpolate(
          frame,
          [wordStartFrame - 5, wordStartFrame],
          [0.3, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <span
            key={index}
            style={{
              fontSize: "72px",
              fontWeight: 900,
              fontFamily: "Inter, sans-serif",
              color: isActive ? "#FFFFFF" : "#666666",
              textShadow: isCurrentWord
                ? "0 0 40px rgba(138, 43, 226, 0.8), 0 4px 20px rgba(0,0,0,0.5)"
                : "0 4px 20px rgba(0,0,0,0.5)",
              transform: `scale(${isCurrentWord ? 1 + scale * 0.15 : 1})`,
              opacity: isActive ? opacity : 0.3,
              transition: "color 0.1s ease",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// Progress bar component
const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: 40,
        right: 40,
        height: 6,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 3,
      }}
    >
      <div
        style={{
          width: `${progress * 100}%`,
          height: "100%",
          backgroundColor: "#8A2BE2",
          borderRadius: 3,
          boxShadow: "0 0 20px rgba(138, 43, 226, 0.6)",
        }}
      />
    </div>
  );
};

// Segment indicator
const SegmentIndicator: React.FC<{ label: string; isActive: boolean }> = ({
  label,
  isActive,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 40,
        padding: "12px 24px",
        backgroundColor: isActive ? "#8A2BE2" : "rgba(0,0,0,0.5)",
        borderRadius: 8,
        fontSize: "24px",
        fontWeight: 700,
        color: "#FFFFFF",
        fontFamily: "Inter, sans-serif",
        textTransform: "uppercase",
        letterSpacing: "3px",
      }}
    >
      {label}
    </div>
  );
};

// Main KaraokeReel composition
export const KaraokeReel: React.FC<{ scriptPath?: string }> = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Hardcoded script data (from the generated JSON)
  const script: VideoScript = {
    hook: {
      text: "Todo criador de conteúdo que usa IA pra fazer vídeos mais rápido tá na verdade perdendo mais tempo. E eu vou provar isso agora.",
      duration: 5,
      visual: "Close-up direto pra câmera, expressão séria, texto overlay: 'VOCÊ TÁ USANDO IA ERRADO'",
    },
    body: [
      {
        text: "A galera acha que automação com IA é só apertar um botão e pronto. Aí passa 3 horas tentando fazer o ChatGPT gerar um roteiro decente, mais 2 horas editando porque a IA não entendeu o seu tom de voz.",
        duration: 12,
        visual: "B-roll: tela de computador com múltiplas abas do ChatGPT abertas, pessoa frustrada olhando pro relógio",
      },
      {
        text: "Resultado? 5 horas pra fazer um vídeo que você faria em 30 minutos sozinho. Mas ninguém fala disso porque todo mundo quer vender curso de IA.",
        duration: 8,
        visual: "Split screen: relógio correndo rápido de um lado, criador cansado do outro",
      },
      {
        text: "A verdade que ninguém conta: IA só acelera quando você tem SISTEMA. Não é a ferramenta, é o processo. Você precisa de prompts salvos, templates testados, workflow definido.",
        duration: 12,
        visual: "Mostrar notion/doc com templates organizados, prompts salvos, checklist de produção",
      },
      {
        text: "Eu testo IA de conteúdo todo dia. Sabe o que funciona de verdade? IA pra 3 coisas específicas: ideação em massa, primeiro rascunho de roteiro, e legendas. Só. O resto é você.",
        duration: 13,
        visual: "Motion graphics mostrando os 3 usos específicos, com ícones e exemplos rápidos",
      },
      {
        text: "E mais: se você tá pagando 5 ferramentas diferentes de IA pra criar vídeo, você tá queimando dinheiro. Uma ferramenta bem usada vale mais que dez mal aproveitadas.",
        duration: 10,
        visual: "Animação de notas de dinheiro pegando fogo, depois mostra dashboard com múltiplas subscriptions",
      },
    ],
    cta: {
      text: "Comenta aqui quantas ferramentas de IA você paga e nem usa direito. Vou responder todo mundo.",
      duration: 5,
      visual: "Volta pro close-up, gesto apontando pra baixo (comentários), overlay: 'COMENTA AÍ'",
    },
    metadata: {
      total_duration: 60,
      hook_pattern: "pattern_interrupt",
      hashtags: [
        "#IAParaCriadores",
        "#AutomacaoDeConteudo",
        "#CriacaoDeVideos",
        "#ProdutividadeIA",
        "#ChatGPT",
        "#CreatorEconomy",
        "#DicasDeConteudo",
        "#InteligenciaArtificial",
      ],
    },
  };

  // Calculate frame positions for each segment
  const segments: Array<{ text: string; startFrame: number; durationFrames: number; label: string }> = [];
  let currentFrame = 0;

  // Hook
  const hookFrames = script.hook.duration * fps;
  segments.push({
    text: script.hook.text,
    startFrame: currentFrame,
    durationFrames: hookFrames,
    label: "HOOK",
  });
  currentFrame += hookFrames;

  // Body segments
  script.body.forEach((segment, index) => {
    const segmentFrames = segment.duration * fps;
    segments.push({
      text: segment.text,
      startFrame: currentFrame,
      durationFrames: segmentFrames,
      label: `PARTE ${index + 1}`,
    });
    currentFrame += segmentFrames;
  });

  // CTA
  const ctaFrames = script.cta.duration * fps;
  segments.push({
    text: script.cta.text,
    startFrame: currentFrame,
    durationFrames: ctaFrames,
    label: "CTA",
  });

  // Find current segment
  const currentSegment = segments.find(
    (seg) => frame >= seg.startFrame && frame < seg.startFrame + seg.durationFrames
  ) || segments[0];

  const progress = frame / durationInFrames;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0a0a0a 100%)",
      }}
    >
      {/* Animated background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% ${30 + Math.sin(frame / 30) * 10}%, rgba(138, 43, 226, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Segment indicator */}
      <SegmentIndicator label={currentSegment.label} isActive={true} />

      {/* Main content area */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {segments.map((segment, index) => (
          <Sequence
            key={index}
            from={segment.startFrame}
            durationInFrames={segment.durationFrames}
          >
            <AbsoluteFill
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <KaraokeText
                text={segment.text}
                startFrame={0}
                durationFrames={segment.durationFrames}
              />
            </AbsoluteFill>
          </Sequence>
        ))}
      </AbsoluteFill>

      {/* Progress bar */}
      <ProgressBar progress={progress} />

      {/* Audio track - Gemini TTS */}
      <Audio src={staticFile("narration.mp3")} />
    </AbsoluteFill>
  );
};
