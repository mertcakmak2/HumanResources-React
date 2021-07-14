import React from 'react'
import { Pagination } from 'antd'

export default function JobPagination({onChangePageable, total}) {

    const onChange = (page, size) => {
        onChangePageable(page-1, size);
    }
    
    return (
        <Pagination onChange={onChange}  defaultCurrent={1} total={total} />
    )
}
