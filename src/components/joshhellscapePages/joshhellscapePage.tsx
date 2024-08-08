import React, { useState, useEffect } from "react";
import DicePopup from "../ui/Popups/dicePopup";



export default function JoshhellscapePage() {

    return (
        <div className="grid auto-rows-auto grid-cols-6 gap-3 p-2">

            <DicePopup/>
            
        </div>
    );
}