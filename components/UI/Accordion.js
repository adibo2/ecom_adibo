import React, { useState } from 'react'
import css from './Accordion.module.scss'
import css1 from './../../footc/Contacto.module.scss';

const Accordion = () => {
    const [selected, Setselected] =useState(null);
    const data=[{
        question:'How come your prices are so low?',
        answer:<>At Instant License, we understand that you may be hesitant to use our service; I mean how is it possible that we can offer you the latest Office and Windows packages at such low prices? <br /> <br />
        We buy large volumes of licences for all products worldwide (China, America, Eastern Bloc and Europe) from companies that have overstock or unused licences in order to get the lowest possible price. We also buy the licences that are no longer used from companies that have failed. We also have minimal overhead costs, such as no operational costs for a shop and do everything digitally. <br /> <br />
        By moving large quantities both in purchases and sales, we can also keep our margins very low to the benefit of the consumer.<br></br> <br />
        Dealers who have a contract with Microsoft are obliged to charge set prices. We do not do this and do not have a contract with Microsoft. Therefore, we can also stay below the set prices.<br></br> <br />
        All licenses are 100% legal and you can read why in the next section. We have been around for more than 4 years now and deliver high quality license keys with guarantee. Our keys are NEVER resold more than once and every customer gets an activation confirmation from Microsoft on his key so you can also count on the official support channels of Microsoft and all the corresponding updates.<br></br> <br />
        </>,
    },{
        question:'Is this legal, then?',
        answer:<>Of course ! The sold licenses are completely legal and working. We encourage all our customers to register their email address and register their specific Microsoft Office product key via Microsoft online activation to ensure authentication and tracking of their authentic software products.<br/><br/>
                    Most of our licenses are new but also pre-owned (It is a key / license that has previously activated a software package. For example on a laptop. When replacing this software or when replacing the laptop, the installed software will no longer be used. The license can therefore be applied again). We always guarantee the functioning of the activation of our keys!<br></br><br></br>

        </>

    },
    {
        question:'Are you allowed to sell this?',
        answer:<>Definitely. There is even a European ruling confirming the sale of second hand software licenses.<br/><br/>
                    European decision of 24 April 2012<br></br><br></br>
                    <a href='http://curia.europa.eu/juris/document/document.jsf?text=&docid=121981&pageIndex=0&doclang=EN&mode=req&dir=&occ=first&part=1&cid=1437095'>Link</a> <br></br> <br/>
                    Second-hand software licenses are completely legal, European Court ruled <br></br><br></br>
                    The European Union Court of Justice has recently taken a milestone decision in favor of the commercialization of second hand software licenses of any kind. According to this, once a software seller or distributor sells a copy of any software tool, it automatically loses its exclusive rights to distribution, making it completely legal for companies and individuals to re-sell their own copies, legitimating this niche market for companies such as the German based UsedSoft, the company that took the case to the European Court. In addition, it is clearly stated in the Court decision that no difference could be applied between physical media and download products. It makes no difference whether the copy of the computer program was made available by means of a download from the right holders website or by means of a material medium such as a CD-ROM or DVD, the court ruled. Even if the right holder formally separates the customers right to use the copy of the program supplied from the operation of transferring the copy of the program to the customer on a material medium, the operation of downloading from that medium a copy of the computer program and that of concluding a license agreement remain inseparable from the point of view of the acquirer. The transfer of property of the licenses also implies the transfer of the legal obligations stablished for both parts, including maintenance and upgrades, also meaning that multiple user licenses for instance cannot be split and sold separately, since the original conditions would still apply in case of a re-sell. However, this decision only affects the European markets, since previous Court decisions in the United States followed a completely different direction. In the precedent-setting case Vernor vs. Autodesk, it was established that US buyers purchase the ability to use a license, but they do not own the software, making redistribution not legally possible. This does not prevent American users to purchase licenses outside the USA, although the legality of such possibility is still unclear. Nevertheless, this European Court decision has a huge importance for companies, since it eliminates the distinction between the purchase of a license and the purchase of a product. The implications of this measure for international trade and intellectual property legislation on the long term still would need to be further discussed, but on the short term the cost-saving potential for European organizations is undoubtedly very important. We will see in the future the real impact that the opening of this market has for European Union based companies.

        </>

    },
    {
        question:'Is the software included ?',
        answer:<> The software is available to you via digital download. Digital download is an electronically delivered product, with which you can immediately download and use your new software.<br/><br/>
                   This means that a physical CD or DVD is not included in your purchase. The software installation program is downloaded via cloud-based storage. You can then easily create your own CD or USB installation medium.<br></br><br></br>

        </>

    },
    {
        question:'Can the software be used on different devices ?',
        answer:<> OEM and retail product software licenses are designed to be installed and enabled on only one computer, unless otherwise specified. If you wish to install the software on another computer, you must uninstall it on the installed computer first.

        </>

    },
    {
        question:'When will I get my order?',
        answer:<> Once your payment is complete, you can download your software immediately. You will also receive a download link by e-mail together with your license code.

        </>

    }
]
    const toggle=(i)=>{
        if(selected===i){
             return Setselected(null)
        }
        Setselected(i);

    }
   
  return (
    <>
     <div className={css1.head}>
        <div className={css1.head_titre}>FAQ</div>
    </div>
        <div className={css.accordion}>
            {data.map((item,i)=>(
                <div key={i} className={css.item}>
                    <div className={css.title} onClick={()=>toggle(i)}>
                        <h2>{item.question}</h2>
                        <span className={css.span}>{selected === i ? '-' : '+'}</span>
                    </div>
                    <div className={` ${css.content} ${selected === i ? css.show : ''}`}>{item.answer}</div>
                </div>
            ))}

        </div>
    </>
  )
}

export default Accordion