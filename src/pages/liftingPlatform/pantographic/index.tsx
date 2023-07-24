import { About } from "@/components/shared/About/About";
import { Banner } from "@/components/shared/Banner/Banner";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import aboutLiftingPlatform from "@/assets/about-lifting-platform.jpg";
import { Guide } from "@/components/Category/Guide/Guide";

import { Utilizations } from "@/components/Category/Utilizations/Utilizations";
import { FindSize } from "@/components/Category/FindSize/FindSize";
import { OtherTypes } from "@/components/Category/OtherTypes/OtherTypes";
import { ExpertRecommendation } from "@/components/shared/ExpertRecommendation/ExpertRecommendation";
import { MachinesAndPlatforms } from "@/components/Home/MachinesAndPlatforms/MachinesAndPlatforms";
import banner from "@/assets/img/elevatingPlatforms.jpg";
import {
  guideCards,
  otherTypesCards,
  utilizationsCards,
} from "@/components/Pantographic/utils";

const Pantographic: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Banner
          breadcrumb="Plataformas Elevatórias > Pantográfica ou Tesoura"
          title="Pantográfica"
          backgroundImage={banner.src}
        />
        <About
          title="Plataforma Elevatória Tesoura"
          description="Vista como um equipamento que facilita trabalhos em altura, além de proporcionar segurança, confiabilidade e produtividade, a plataforma elevatória tesoura é uma solução que atende perfeitamente às normas de segurança que envolvem atividades laborais na construção civil, entre outros ramos."
          image={aboutLiftingPlatform}
          alt="Imagem"
        />
        <About
          title="Plataforma Elevatória Tesoura"
          theme="orange-500"
          color="white"
          orientation="inverted"
          description="Vista como um equipamento que facilita trabalhos em altura, além de proporcionar segurança, confiabilidade e produtividade, a plataforma elevatória tesoura é uma solução que atende perfeitamente às normas de segurança que envolvem atividades laborais na construção civil, entre outros ramos."
          image={aboutLiftingPlatform}
          alt="Imagem"
          hasButton={false}
        />
        <Guide cards={guideCards} />
        <Utilizations
          cards={utilizationsCards}
          title="Utilizações da plataforma elevatória tesoura"
          description="Operações que requerem o alcance a áreas de difícil acesso podem ser feitas com <b>máxima segurança</b> por meio da plataforma tesoura. Outra característica que a difere das outras plataformas elevatórias é a possibilidade de transporte de pequenas cargas. Confira algumas das formas e dos locais de utilização:"
        />
        <About
          image={aboutLiftingPlatform}
          alt="Imagem"
          title="Preço: O que considerar?"
          description={[
            "Ao escolher uma <b>plataforma</b> tesoura para a necessidade da sua empresa, diversos pontos precisam ser considerados no momento de decisão.",
            "No mercado, existem as modalidades de aluguel e compra, sendo que a primeira costuma ser mais interessante, pois torna o preço da plataforma elevatória tesoura mais acessível.",
            "A <b>segurança que o equipamento</b> fornece precisa ser levada em consideração, junto à assistência técnica, confiabilidade, qualidade, frete e modernidade. Afinal, independentemente da modalidade de aquisição, é preciso <b>contar com suporte</b> e um fornecedor que resolva qualquer questão que possa aparecer.",
          ]}
          hasButton={false}
          orientation="inverted"
        />
        <FindSize
          title="Como escolher o tamanho ideal"
          slides={[
            "Faça um planejamento prévio de todas as atividades que o equipamento precisará executar.",
            "Analise a altura de trabalho, a característica do piso, a capacidade de carga que o equipamento precisa transportar, o espaço disponível no local de trabalho e tudo o que envolve a atividade. Esse levantamento ajudará você a descobrir o tamanho e o tipo ideal de plataforma elevatória.",
          ]}
        />
        <OtherTypes
          title="Conheça outros tipos de plataforma elevatória"
          description={[
            "Aqui, na Mills, além da <b>plataforma elevatória tesoura</b> (ou plataforma pantográfica), estão disponíveis diversos outros modelos como a plataforma elevatória articulada e a plataforma elevatória telescópica, em motorização elétrica ou a diesel.",
            "As plataformas elevatórias atendem diferentes demandas de trabalho em altura, portanto, o ideal é conhecer as especificações técnicas de cada uma e escolher a perfeita para o seu tipo de trabalho.",
          ]}
          cards={otherTypesCards}
        />
        <ExpertRecommendation />
        <MachinesAndPlatforms />
      </main>
      <Footer />
    </>
  );
};

export default Pantographic;
