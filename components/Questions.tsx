import React, {use} from 'react'
import supabase from '@/utils/supabase'

async function getInfo() {
    try {
        const { data, error } = await supabase
            .from("questions")
            .select()
        if (data == null) return;
        return data[0];
    } catch (error) { }
}

function Questions() {

    let res = use(getInfo());

    console.log(res);

  return (
    <div className='questions'>
        <main>
            <h2>{res.question}</h2>
            <section>
                <h3>{res.option_1}</h3>
                <h3>{res.option_2}</h3>
                <h3>{res.option_3}</h3>
                <h3>{res.option_4}</h3>
                <h3>{res.option_5}</h3>
            </section>
        </main>

    </div>
  )
}

export default Questions