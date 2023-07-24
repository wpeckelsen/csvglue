import React, {useState, useEffect} from "react";
import csvDownloader from "../../csvDownloader";
import Box from "../../Components/CheckBox/Box";
import PageCard from "../../Components/PageCard/PageCard";
import Button from "../../Components/Button/Button";
import Grid from "../../Components/Grid/Grid";
import "./Trimmer.css";

function Trimmer() {
    const [inputValue, setInputValue] = useState("");
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [checkbox3, setCheckbox3] = useState(false);
    const [outputArray, setOutputArray] = useState([]);
    const [length, setLength] = useState(0);
    const [showSecondary, setShowSecondary] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        let inputValues = inputValue.split(/\r?\n/).filter(Boolean);

        let outputValues = inputValues.map((value) => {
            let trimmedInput = value
                .toLowerCase() // all characters are lowered
                .replace(/.*?\s/, "") // removes anything before the whitespace (including the whitespace)
                .replace(/(https?:\/\/)?(www\.)?/g, "") // removes "https://", "http://", and "www."
                .replace(/\/.*$/g, ""); // removes trailing slash and anything after it


            let output = trimmedInput;
            if (checkbox1 && checkbox2 && checkbox3) {
                output = `https://www.${output}/`;
            } else if (checkbox1 && checkbox2) {
                output = `https://www.${output}`;
            } else if (checkbox1 && checkbox3) {
                output = `https://${output}/`;
            } else if (checkbox2 && checkbox3) {
                output = `www.${output}/`;
            } else if (checkbox1) {
                output = `https://${output}`;
            } else if (checkbox2) {
                output = `www.${output}`;
            } else if (checkbox3) {
                output = `${output}/`;
            }
            return output;
        });

        setOutputArray(outputValues);
    }, [inputValue, checkbox1, checkbox2, checkbox3]);

    function getAmount() {
        return outputArray.length;
    }

    function handleChange(event) {
        setInputValue(event.target.value);
    }

    function handleCheckbox1Change() {
        setCheckbox1(!checkbox1);
    }

    function handleCheckbox2Change() {
        setCheckbox2(!checkbox2);
    }

    function handleCheckbox3Change() {
        setCheckbox3(!checkbox3);
    }

    function handleCSVDownload() {
        let csvData = "data:text/csv;charset=utf-8,";
        csvData += "Output\n";
        outputArray.forEach((output) => {
            csvData += `${output}\n`;
        });
        csvDownloader(csvData, "output.csv");
    }

    const counts = outputArray.reduce(function (acc, val) {
        if (val in acc) {
            acc[val]++;
        } else {
            acc[val] = 1;
        }
        return acc;
    }, {});

    const duplicates = Object.values(counts).reduce(function (acc, val) {
        if (val > 1) {
            acc += val;
        }
        return acc;
    }, 0);

    function arrayMapper() {
        const mapped = outputArray.map((output, index) => output);
        return mapped.join("\n");
    }

    const handleCopy = () => {
        const copiedText = arrayMapper();
        navigator.clipboard.writeText(copiedText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
    };

    const highlightedIndices = [];

    outputArray.forEach((output, index) => {
        if (outputArray.indexOf(output) === index) {
            highlightedIndices.push(index);
        } else {
            const firstOccurrenceIndex = outputArray.indexOf(output);
            const secondOccurrenceIndex = outputArray.indexOf(output, firstOccurrenceIndex + 1);
            if (secondOccurrenceIndex === index) {
                highlightedIndices.push(index);
            }
        }
    });

    return (

        <>
            <div className="title"
                 onMouseEnter={() => setShowSecondary(true)}
                 onMouseLeave={() => setShowSecondary(false)}
            >
                {showSecondary ? <span><h1>https://www.domaintrimmer.com/</h1></span> : <span><h1>Domain Trimmer</h1></span>}
            </div>


            <div className="trimmer-page">
                <PageCard
                    // className="trimmer-card"
                    title="Input"
                    subtitle="Paste your list of messy domains below!"
                    content={
                        <>
                            <p>
                                Common numbering characters such as 1), 2:, 3. or - are removed too.
                            </p>

                            <p>
                                <span className="ugly">Red</span> means a domain doesn't start with 0-9 or a-z.
                            </p>

                            <p>
                                <span className="purple">Purple</span> means a domain is duplicated, with <span
                                className="purple2">light purple</span> as the next occurrence.
                            </p>

                            <label>
                                <textarea className="input" value={inputValue} onChange={handleChange}/>
                            </label>
                        </>
                    }
                />

                <PageCard
                    title="Result"
                    content={
                        <>

                            <Grid
                                content={<>
                                    <p className="grid-a">Duplicates:</p>
                                    <p className="grid-c">{duplicates}</p>
                                    <p className="grid-e">Total Domains:</p>
                                    <p className="grid-g">{getAmount()}</p>
                                </>}
                            />


                            <Grid
                                content={
                                    <>
                                        <div className="grid-a">
                                            <Box
                                                description="add https://"
                                                checked={checkbox1}
                                                handleChange={handleCheckbox1Change}
                                            />

                                            <Box
                                                description="add www."
                                                checked={checkbox2}
                                                handleChange={handleCheckbox2Change}
                                            />

                                            <Box
                                                description="add trailing slash/"
                                                checked={checkbox3}
                                                handleChange={handleCheckbox3Change}
                                            />
                                        </div>


                                        <div className="grid-c">
                                            <Button
                                                click={handleCSVDownload}
                                                content="Download CSV"
                                                type="button"
                                            />

                                            <Button
                                                click={handleCopy}
                                                content={isCopied ? 'Copied!' : 'Copy'}
                                                type="button"
                                            />
                                        </div>

                                        <div className="grid-d">
                                            <div className="results">
                                                <ul className="domainList">
                                                    {outputArray.length > 0 ? (
                                                        outputArray.map((output, index) => {
                                                            const firstOccurrenceIndex = outputArray.indexOf(output);
                                                            const isDuplicate = outputArray.indexOf(output, firstOccurrenceIndex + 1) !== -1;
                                                            const highlightColor =
                                                                /^[^a-zA-Z0-9]/.test(output) ? "ugly" :
                                                                    isDuplicate && firstOccurrenceIndex === index ? "purple" :
                                                                        isDuplicate && firstOccurrenceIndex !== index ? "purple2" :
                                                                            "";


                                                            return (
                                                                <li key={index}>

                                                                        <span className="restrain">
                                                                        <p className={highlightColor}>{output}</p>
                                                                            </span>

                                                                </li>
                                                            );
                                                        })


                                                    ) : (
                                                        <>
                                                            <li></li>
                                                            <li></li>
                                                            <li></li>
                                                        </>
                                                    )}
                                                </ul>
                                            </div>


                                        </div>

                                    </>
                                }
                            />
                            <h3 className="outro">Thank you for trimming with us</h3>
                        </>
                    }
                />

            </div>
        </>
    );
}

export default Trimmer;
