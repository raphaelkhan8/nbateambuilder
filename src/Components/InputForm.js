import React from "react";

const InputForm = (props) => {
    const { inputYear, handleChange, handleSubmit, handleEnterKey } = props;
    return (
        <div>
            <form id="inputForm" onSubmit={handleSubmit} onKeyPress={handleEnterKey}>
                <label>
                    NBA Season:
                    <textarea
                        placeholder="Input season end-year (1998 - 2020)"
                        value={inputYear}
                        onChange={handleChange}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default InputForm;
