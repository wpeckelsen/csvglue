import PageCard from "../../Components/PageCard/PageCard";

function Contact(){

    return(
        <PageCard
            title="Contact"
            subtitle="Contact me if you have any improvements for this website."
            content={<>
                <p>Mind the typos in the mailto</p>
                <br/>
                <a href="mailto:domaintrimmer@gmail,com">domaintrimmer//@//gmail.com</a>

            </>}
        />
    )

//     <div className="page-card">
//                 <h2>{title}</h2>
//                 <p><b>{subtitle}</b></p>
//                 <div className="content">{content}</div>
}
export default Contact;