import React, {useState} from 'react';
import PageCard from "../../Components/PageCard/PageCard";
import Button from "../../Components/Button/Button";
import "./Gluer.css"

function Gluer() {
    const [csvFiles, setCSVFiles] = useState([]);
    const [mergedCSV, setMergedCSV] = useState(null);
    const [input, setInput] = useState("");
    const [showSecondary, setShowSecondary] = useState(false);


    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setCSVFiles([...csvFiles, ...files]);
        // When files are uploaded, update the mergedCSV state
        handleGlueFiles(files);
    };

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleGlueFiles = async (files) => {
        const readFile = (file) =>
            new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsText(file);
            });

        const fileContents = await Promise.all(files.map((file) => readFile(file)));
        const mergedContent = fileContents.join('\r\n');
        setMergedCSV(mergedContent); // Set the merged content here
    };

    const handleDownload = () => {
        if (mergedCSV) {
            const blob = new Blob([mergedCSV], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${input}.csv`;
            link.click();
            URL.revokeObjectURL(url);
        }
    };

    return (


        <div>


            <PageCard
                title={
                    <div className="title"
                         onMouseEnter={() => setShowSecondary(true)}
                         onMouseLeave={() => setShowSecondary(false)}
                    >
                        {showSecondary ? <span>Glue-CSV-files</span> : <span>Glue CSV files</span>}
                    </div>
                }
                subtitle="Add all your .csv files together and glue them into one big file. Files will be appended underneath eachother."
                content={
                    <>
                        <input type="file" multiple onChange={handleFileChange}/>
                        <p>Filename: </p>
                        <input type="text" className="input" value={input} onChange={handleChange}
                               placeholder="merged-list"
                        />
                        <br/>
                        <br/>
                        {mergedCSV && <Button type="button" click={handleDownload} content="Download"/>}
                    </>
                }
            />
        </div>
    );
}

export default Gluer;
