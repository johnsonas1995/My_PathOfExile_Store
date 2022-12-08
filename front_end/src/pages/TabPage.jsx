




export default function TabPage(){



    return (
        <div>
            <img class="item" src={item.icon} /> <br/>
                {item.name} <br/>
                {item.baseType} <br/>
            <h4>Explicits:</h4>
                {item.explicitMods} <br/>
            <h4>Implicits:</h4>
                {item.implicitMods} <br/>
        </div>
    )

}