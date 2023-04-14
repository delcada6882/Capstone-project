import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Divider from '../components/HTML tag components/Divider/Divider';
import NumberInput from '../components/HTML tag components/Inputs/NumberInput/NumberInput';
import TextInput from '../components/HTML tag components/Inputs/TextInput/TextInput';
import Label from '../components/HTML tag components/Label/Label';
import FormWrapper from '../components/Utillity components/FormWrapper/FormWrapper';
import { getSomeClasses } from '../data/getClasses';

function EditClass() {
    // const { specificClass } = useParams();
    const [searchParams] = useSearchParams();
    const index = searchParams.get('index');
    const [data, setData] = useState(null);

    useEffect(() => {
        console.log(index);
        async function redoClasses() {
            await getSomeClasses(index, 1).then((item) => {
                setData(item);
                console.log(item);
            });
        }
        redoClasses();
    }, []);

    return (
        <FormWrapper>
            <Label>Name</Label>
            <TextInput placeholder={data === null ? '' : data[0].name} />

            <Label>Teacher</Label>
            <TextInput placeholder={data === null ? '' : data[0].teacher} />

            <Label>Description</Label>
            <TextInput placeholder={data === null ? '' : data[0].description} />

            <Label>Subject</Label>
            <TextInput placeholder={data === null ? '' : data[0].subject} />

            <Label>Time</Label>
            <TextInput
                placeholder={
                    data === null
                        ? ''
                        : data[0].start_time + ' - ' + data[0].end_time
                }
            />

            <Label>Credits</Label>
            <NumberInput placeholder={data === null ? '' : data[0].credits} />

            <Label>Semester</Label>
            <NumberInput placeholder={data === null ? '' : data[0].semester} />
        </FormWrapper>
    );
}

export default EditClass;
