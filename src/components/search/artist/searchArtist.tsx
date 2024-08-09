
import { LoadingSVGWatting } from '@/Icons/Loading';
import React from 'react';
import { list_userType } from '@/model/userModel';
import './_searchArist.scss'
import ItemSearchArtist from '@/components/search/artist/searchItemArtist';
type Props = {
    listArist: list_userType
    is_loading: boolean
}
const SearchArtist = ({ listArist, is_loading }: Props) => {
    return (
        <div className="bodySearchPageAll">
            {is_loading && <div className='loading'>
                <LoadingSVGWatting w={100} />
            </div>}
            {!is_loading && <>
                {listArist.length == 0 && <div className='emtyData'><h1>Not found</h1></div>}
                {listArist.length != 0 && <div className='listAristSearch'>
                    {listArist.map((user, i) => {
                        return <ItemSearchArtist key={i} user={user} active={false} />
                    })}
                </div>}
            </>}
        </div>
    );
}

export default SearchArtist;
