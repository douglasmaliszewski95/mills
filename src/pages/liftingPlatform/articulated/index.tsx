import { About } from "@/components/shared/About/About";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import aboutLiftingPlatform from "@/assets/about-lifting-platform.jpg";
import { OtherTypes } from "@/components/Category/OtherTypes/OtherTypes";
import tesoura from "@/assets/img/tesoura.jpg";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { MachinesAndPlatforms } from "@/components/Home/MachinesAndPlatforms/MachinesAndPlatforms";
import { Information } from "@/components/Category/Information/Information";
import { Banner } from "@/components/shared/Banner/Banner";
import banner from "@/assets/img/elevatingPlatforms.jpg";
import { Utilizations } from "@/components/Category/Utilizations/Utilizations";
import { utilizationCards } from "@/components/Articulated/utils";

const articulated: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Banner
          breadcrumb="Plataformas Elevatórias > Lança Articulada"
          title="Lança articulada"
          backgroundImage={banner.src}
          blur="bg-black/50"
        />
        <About
          title="Plataforma Elevatória Lança Articulada"
          description="Acessar locais de difícil acesso é uma missão simples para a plataforma elevatória articulada. Com uma lança dobrável que permite alcance horizontal e vertical, ela pode executar os mais diversos tipos de trabalho com total estabilidade e segurança."
          image={aboutLiftingPlatform}
          alt="Imagem"
        />
        <About
          title="Características da Plataforma Elevatória Articulada"
          description={[
            "As características podem variar de acordo com a motorização: a plataforma elevatória a diesel é indicada para piso irregular e, a plataforma elevatória elétrica, para piso plano.",
            "O modelo de plataforma elevatória articulada possibilita o trabalho sobre diversos obstáculos e objetos, com mecanismos que permitem giros de até 360 graus.",
            "Por ter uma estrutura menor que os outros tipos, transporta só um trabalhador. Entretanto, tem como ponto positivo a performance superior à de outros modelos (como a plataforma tesoura), o que permite executar o trabalho de maneira mais fácil e dinâmica.",
          ]}
          image={aboutLiftingPlatform}
          alt="Imagem"
          hasButton={false}
          orientation="inverted"
          theme="beige-200"
        />
        <Information
          title="Normas para trabalho em altura: Plataforma Elevatória"
          description="Algumas normas brasileiras indicam regras e recomendações para uso da tecnicamente chamada Plataforma Elevatória Móvel de Trabalho (PEMT), entre elas estão a NBR 16776, da ABNT e as Normas Regulamentadoras 18 e 35, do Ministério do Trabalho e Previdência,  que abordam Segurança e Saúde no Trabalho da Indústria da Construção e Trabalho em Altura, respectivamente."
        />
        <About
          title="Onde usar plataforma elevatória articulada?"
          description={[
            "Aliando alta performance e versatilidade, a plataforma elevatória articulada pode ser usada na execução de diversos tipos de trabalhos.",
            "Uma função muito comum é a substituição do andaime, com isso, a realização de atividades se torna mais segura, já que dispensa montagem e elimina os riscos do processo, além do ganho de tempo.",
          ]}
          image={aboutLiftingPlatform}
          alt="Imagem"
          hasButton={false}
        />
        <Utilizations
          title="Confira as principais aplicações deste tipo de plataforma elevatória:"
          description="Alguns aspectos devem ser levados em consideração na hora de alugar a lança articulada. Pontos como ambiente interno ou externo, altura que deverá ser alcançada, obstáculos para acessar o local desejado e  tipo de solo ajudam a definir qual o modelo ideal para a necessidade da sua empresa."
          cards={utilizationCards}
          theme="orange"
        />
        <About
          title="Aluguel plataforma elevatória articulada: como funciona?"
          description={[
            "O preço do aluguel de plataforma elevatória articulada, é um atrativo que torna a modalidade uma alternativa interessante para as empresas que não pretendem comprar o equipamento.",
            "É muito importante ter em mente todas as necessidades que o equipamento precisará suprir na sua empresa/atividade, assim, fica mais fácil encontrar uma solução assertiva entre as opções disponíveis para locação.",
          ]}
          image={aboutLiftingPlatform}
          alt="Imagem"
          hasButton={false}
          orientation="inverted"
          theme="beige-200"
        />
        <OtherTypes
          title="Conheça outros tipos de plataforma elevatória"
          description={[
            "Aqui, na Mills, além da plataforma elevatória tesoura (ou plataforma pantográfica), estão disponíveis diversos outros modelos como a plataforma elevatória articulada e a plataforma elevatória telescópica, em motorização elétrica ou a diesel.",
            "As plataformas elevatórias atendem diferentes demandas de trabalho em altura, portanto, o ideal é conhecer as especificações técnicas de cada uma e escolher a perfeita para o seu tipo de trabalho.",
          ]}
          cards={[
            {
              label: "Plataforma Elevatória Tesoura",
              backgroundImage: tesoura.src,
              href: "/plataformas-elevatorias/pantografica-ou-tesoura",
            },
            {
              label: "Plataforma Elevatória Telescópica",
              backgroundImage: tesoura.src,
              href: "/plataformas-elevatorias/telescopica",
            },
          ]}
        />
        <ExpertRecommendation />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
};

export default articulated;
