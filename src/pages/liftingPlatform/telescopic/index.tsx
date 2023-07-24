import { Banner } from "@/components/shared/Banner/Banner";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import banner from "@/assets/img/elevatingPlatforms.jpg";
import { About } from "@/components/shared/About/About";
import aboutLiftingPlatform from "@/assets/about-lifting-platform.jpg";
import { WhenToUse } from "@/components/Category/WhenToUse/WhenToUse";
import { Information } from "@/components/Category/Information/Information";
import tesoura from "@/assets/img/tesoura.jpg";
import { OtherTypes } from "@/components/Category/OtherTypes/OtherTypes";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { MachinesAndPlatforms } from "@/components/Home/MachinesAndPlatforms/MachinesAndPlatforms";

const Telescopic: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Banner
          title="Lança Telescópica"
          breadcrumb="Plataformas Elevatórias > Lança Telescópica"
          backgroundImage={banner.src}
          blur="bg-black/50"
        />
        <About
          title="O que é uma plataforma telescópica?"
          description={[
            "A plataforma telescópica permite elevações de longo alcance, oferecendo a segurança e o conforto necessários para alcançar áreas de trabalho mais altas e de difícil acesso em diferentes terrenos.",
            "A plataforma telescópica tem apenas um estágio de lança, o que torna possível alcançar rapidamente a altura desejada. Muito recomendada para trabalhos externos, esse equipamento necessita de bastante espaço para operar corretamente.",
          ]}
          image={aboutLiftingPlatform}
          alt="Imagem"
          link={"/buscar-equipamento"}
        />
        <About
          title="Como funciona a plataforma telescópica?"
          description={[
            "A plataforma telescópica tem como principal característica o seu longo alcance, com manobras mais certeiras e precisas. Esse equipamento permite realizar operações com maior agilidade, graças à sua estrutura que necessita de menos comandos do que outras versões, como a plataforma articulada, por exemplo.",
            "No entanto, é necessário que a plataforma telescópica fique a uma longa distância e com maior espaço para que chegue até o local de trabalho determinado. Assim, ela se torna uma excelente alternativa para alcançar locais de grande altura e que tem obstáculos ao redor da superfície que se deseja alcançar.",
          ]}
          image={aboutLiftingPlatform}
          alt="Imagem"
          hasButton={false}
          orientation="inverted"
          theme="green-800"
          color="white"
        />
        <WhenToUse
          title="Quando usar a <br>Plataforma Elevatória Telescópica?"
          cards={[
            "A plataforma telescópica <b>deve ser usada em ambientes externos, de maior altura e longa distância.</b> Existem opções desse equipamento que alcançam até 56,69 metros de altura, com alcance horizontal de até 24,40 metros.",
            "O braço telescópico proporciona flexibilidade do envelope de trabalho e ainda mais alcance na elevação, sendo <b>ideal para empreiteiros em geral, serviços de vidraçarias e limpezas de janelas,</b> entre outros projetos.",
            "Ela <b>não é uma alternativa para condições em que é necessário estar paralelo ao local de trabalho.</b> Para essa finalidade, prefira outros equipamentos, como a plataforma tesoura ou articulada (link para articulada), por exemplo.",
          ]}
        />
        <About
          title="Plataforma telescópica:<br> como escolher o equipamento ideal?"
          description={[
            "As plataformas telescópicas podem atingir mais de 50 metros de altura. Para fazer a escolha mais adequada, considere as condições do local de trabalho, ou seja, o ambiente em que a máquina vai operar.",
            "Um dos critérios mais importantes é avaliar a altura e a distância para a execução do trabalho. Verifique também a capacidade da carga do equipamento, analisando o peso do material que será transportado com a plataforma.",
          ]}
          image={aboutLiftingPlatform}
          alt="Imagem"
          orientation="inverted"
          theme="orange-500"
          color="white"
          hasButton={false}
        />
        <Information
          title="Plataforma elevatória telescópica elétrica ou a diesel: qual é a melhor?"
          description="As opções de plataformas elevatórias estão disponíveis somente a diesel. Essa não é uma alternativa de plataforma elevatória elétrica."
          theme="white"
        />
        <Information
          title="Plataforma telescópica para pisos irregulares ou planos?"
          description="As versões de plataformas disponíveis são recomendadas tanto para pisos irregulares quanto para pisos planos. Porém, é essencial utilizar a plataforma em terrenos firmes."
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
              label: "Plataforma Elevatória Articulada",
              backgroundImage: tesoura.src,
              href: "/plataformas-elevatorias/articulada",
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

export default Telescopic;
