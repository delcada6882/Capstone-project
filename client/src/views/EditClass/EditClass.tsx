import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import NumberInput from 'HTML_components/Inputs/NumberInput/NumberInput';
import TextInput from 'HTML_components/Inputs/TextInput/TextInput';
import Label from 'HTML_components/Label/Label';
import FormWrapper from '../../components/Utillity components/FormWrapper/FormWrapper';
import { getSomeClasses } from '../../data/getClasses';
import { Class } from '../../data/Interfaces/Class';

function EditClass() {
    // const { specificClass } = useParams();
    const [searchParams] = useSearchParams();
    const index = Number(searchParams.get('index'));
    const [data, setData] = useState<Class[] | null>(null);

    useEffect(() => {
        async function redoClasses() {
            await getSomeClasses(index, 1)
                .then((item) => {
                    setData(item);
                })
                .catch(console.error);
        }
        redoClasses();
    }, [index]);

    return (
        <FormWrapper>
            <Label>Name</Label>
            <TextInput placeholder={data === null ? '' : data[0].name} />

            <Label>Teacher</Label>
            <TextInput
                placeholder={data === null ? '' : data[0].teacher?.toString()}
            />

            <Label>Description</Label>
            <TextInput
                placeholder={
                    data === null ? '' : data[0].description?.toString()
                }
            />

            <Label>Subject</Label>
            <TextInput
                placeholder={data === null ? '' : data[0].subject?.toString()}
            />

            <Label>Time</Label>
            <TextInput
                placeholder={
                    data === null
                        ? ''
                        : data[0].start_time + ' - ' + data[0].end_time
                }
            />

            <Label>Credits</Label>
            <NumberInput
                placeholder={data === null ? '' : data[0].credits?.toString()}
            />

            <Label>Semester</Label>
            <NumberInput
                placeholder={data === null ? '' : data[0].semester?.toString()}
            />
        </FormWrapper>
    );
}

export default EditClass;
