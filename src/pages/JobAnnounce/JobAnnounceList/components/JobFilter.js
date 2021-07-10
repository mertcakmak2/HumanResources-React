import React, { useEffect, useState } from 'react'
import { Button, Select } from 'antd'
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import JobTypeService from '../../../../services/jobTypeService';
import CityService from '../../../../services/cityService';

let jobTypeService = new JobTypeService();
let cityService = new CityService();

const { Option } = Select;

export default function JobFilter({handleFilter}) {

    const [cities, setCities] = useState([])
    const [jobTypes, setJobTypes] = useState([])
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedJobTypes, setSelectedJobTypes] = useState([]);

    useEffect(() => {
        jobTypeService.findAllJobTypes().then(response => {
            if (response?.data?.success && response.status === 200) setJobTypes(response.data.data)
        })

        cityService.findAllCities().then(response => {
            if (response?.data?.success && response.status === 200) setCities(response.data.data)
        })
    }, [])

    const cityHandleChange = (values) => setSelectedCities([...values])

    const jobTypeHandleChange = (values) => setSelectedJobTypes([...values])

    const onFilter = () => handleFilter(selectedCities, selectedJobTypes);
    
    const onClearFilters = () => {
        setSelectedCities([])
        setSelectedJobTypes([])
    }

    return (
        <div style={{ display: 'flex' }}>
            <Select mode="tags" style={{ width: '100%' }} placeholder="Şehir" onChange={cityHandleChange} value={selectedCities}>
                { cities.map(city => (<Option key={city.id}>{city.name}</Option>)) }
            </Select>

            <Select mode="tags" style={{ width: '100%' }} placeholder="Çalışma Türü" onChange={jobTypeHandleChange} value={selectedJobTypes}>
                { jobTypes.map(jobType => (<Option key={jobType.id}>{jobType.type}</Option>)) }
            </Select>

            <Button style={{marginLeft:"5px"}} onClick={onFilter} type="primary" icon={<SearchOutlined />}>
                Filtrele
            </Button>

            <Button style={{marginLeft:"5px"}} onClick={onClearFilters} type="primary" icon={<ClearOutlined />}>
                Filtreleri Temizle
            </Button>
        </div>
    )
}
