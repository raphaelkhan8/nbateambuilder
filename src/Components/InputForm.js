import React from "react";

const InputForm = (props) => {
    const { inputYear, handleChange, handleSubmit } = props;
    return (
        <div>
            <form id="inputForm" onSubmit={handleSubmit}>
                <label>
                    NBA Season:
                    <textarea
                        placeholder="Input season end-year (2000 - 2020)"
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
