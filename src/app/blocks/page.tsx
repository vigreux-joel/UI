export default function Home() {
  return (
    <main>
      <div className=" section relative flex z-10 flex-wrap gap-8 justify-content-between  ">
        <div className="  left lg:flex-2 z-10 max-w-prose">
          <div
            className="aos-init aos-animate"
            data-aos="zoom-in"
            data-aos-duration="800"
          >
            <p className="sub-title title-5">Libérez votre créativité</p>
            <h2>
              Éditeur de glisser-déposer intuitif pour une création facile
            </h2>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="aos-init aos-animate"
          >
            <div className="description mb-8 ">
              <p>
                Ne vous souciez pas du code ou des connaissances techniques.
                Ajouter, déplacer et modifier les éléments de votre site web en
                quelques clics.
              </p>
              <p>
                Ajustez les marges, les alignements et les espacements pour
                obtenir le rendu parfait. Votre site sera prêt à être publié
                rapidement, sans tracas ni complications !
              </p>
            </div>
          </div>
        </div>
        <div className="right flex-1 md:ml-auto">
          <div className="bg-secondary right-0 top-1/2 opacity-20  absolute content rounded-[50%] color-spot -translate-x-1/2"></div>
          <img
            alt="Illustration"
            height="509"
            src="https://strap-media-storage.s3.eu-west-3.amazonaws.com/shape_dividers_0667843_2_28a39f1145.png"
            width="526"
            className="lg:max-w-full mx-auto lg:mr-0 block md:max-w-fit max-w-full z-10 h-auto relative sticky-scroll"
            loading="lazy"
          />
        </div>
      </div>
    </main>
  );
}
