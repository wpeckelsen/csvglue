import PageCard from "../../Components/PageCard/PageCard";

function About(){
    return(

        <>
            <div className="about-page">
        <PageCard

            title="About this website"

            content={<>
                <p>Glue several CSV files together. Made with the help of OpenAI</p>
            </>}
        />

            </div>
        </>
    )
}

export default About;