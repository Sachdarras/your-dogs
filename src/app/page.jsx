import HeroSlider from './component/HeroSlider';

export default function Home() {
  return (
    <>
      <HeroSlider />
      <section className='home-container'>
        <article className='projet-container'>
          <h2>Le projet YourDogs</h2>
          <p>
            Le site <strong>YourDogs</strong> a pour objectif de créer une carte interactive partagée, permettant aux utilisateurs de noter des lieux de promenade et des espaces "dog-friendly". Nous souhaitons offrir une plateforme où les passionnés de chiens peuvent échanger des informations sur les meilleurs endroits pour promener leur compagnon à quatre pattes.
          </p>
          <p>
            En plus de la carte, le site permet aux utilisateurs de faire connaissance avec des professionnels du secteur canin : éducateurs, vétérinaires et autres spécialistes, pour enrichir l'expérience des propriétaires de chiens.
          </p>
          <p>
            Nous proposons également un espace pour échanger sur les différents sports canins, permettant ainsi aux propriétaires d'explorer des activités sportives adaptées à leurs chiens.
          </p>
          <p>
            Avec <strong>YourDogs</strong>, nous souhaitons renforcer la communauté des amoureux des chiens, faciliter les rencontres entre propriétaires et professionnels, et promouvoir un mode de vie actif et équilibré pour nos animaux.
          </p>
        </article>
      </section>
    </>
  );
}
