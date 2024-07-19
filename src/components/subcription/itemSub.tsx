import React from 'react';
import './_itemSub.scss'
import { CheckIcon } from '@/Icons/icon_v1';
const ItemSub = () => {
    return (
        <div className='itemSub'>
            <div className="headerItemPlan">
                <div className="titleSubPlan">
                    <h1>Basic</h1>
                </div>
                <div className="priceSubPlan">
                    <h1>299$</h1>
                    <h3>/month</h3>
                </div>
            </div>
            <div className="bodyItemPlan">
                <div className="frameBtnPlan cursor_pointer">
                    <div className="btnPlan">
                        Select plan
                    </div>
                </div>


                <ul>
                    <li><CheckIcon w={20} /> <h3>1GB</h3></li>
                    <li><CheckIcon w={20} /> <h3>1GB</h3></li>
                    <li><CheckIcon w={20} /> <h3>1GB</h3></li>
                    <li><CheckIcon w={20} /> <h3>1GB</h3></li>
                </ul>

            </div>
        </div>
    );
}

export default ItemSub;
