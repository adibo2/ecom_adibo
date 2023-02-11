import React, { useState } from 'react'
import css from './Accordion.module.scss'
import css1 from './../../footc/Contacto.module.scss';

const Accordion = () => {
    const [selected, Setselected] =useState(null);
    const data=[{
        question:'How come your prices are so low?',
        answer:<>At Microsoft Key Market, we understand that you may be hesitant to use our service; I mean how is it possible that we can offer you the latest Office and Windows packages at such low prices? <br /> <br />
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

    },
    {
        question:`I haven't received my order/email?`,
        answer:<>The mail containing your license codes and links to the software will be sent automatically after your order, so you will receive it in your mailbox in just a few moments. The mail will be sent to the e-mail address you ordered with. If you suspect that you have entered an incorrect e-mail address, please contact us as soon as possible via clientcare@instant-license.com.<br /> <br></br>Also be sure to check your spam or junk folder, especially if you have an email address that ends in @hotmail.xxx or @live.xxx or @outlook.xxx.

        </>

    },
    {
        question:'What kind of support do you offer?',
        answer:<>You can always contact us by mail or our contact form. Our support staff will be happy to answer your question during office hours.<br /> <br></br>As we have the license guarantee as the starting point of our business operations, you will always be helped to get a working license. When you contact us, we will ask you for the procedure followed or to send screenshots.

        </>

    },
    {
        question:<>{" Why can't I activate my license? "}</> ,
        answer:<>{"Microsoft Key Market sometimes sells pre-owned licenses. This means that we sell licenses that were previously activated, but are no longer active due to hardware replacement or failure of the company. These licenses are then reactivated. Now it is possible that the re-activation was not successful via the Internet. These licenses then still work by re-activation over the phone. Select Telephone activation and follow the procedure.<br></br><br></br>We give you a 100% license guarantee. We guarantee that if you buy a license from us, you will get an optimal working license from us.<br></br><br />In the meantime, you can always download a fully functional trial version of the software product of your choice from our download page."}

        </>

    },
    {
        question:'What is telephone activation (Office)?',
        answer:<>Microsoft Key Market sometimes sells pre-owned licenses. This means that we sell licenses that were previously activated, but are no longer active due to hardware replacement or failure of the company. These licenses are then reactivated. Now it is possible that the re-activation was not successful via the Internet. These licenses then still work by re-activation over the phone. Select "Telephone activation" and follow the procedure.
        <br></br><br></br><br></br>
        —————-
        <br></br><br></br><br></br>
        You then choose the toll-free number of your country from the selection list and contact Microsoft. A computer voice will guide you. You enter your code which will be displayed on your screen and the computer voice will give you a confirmation code which you will have to re-enter yourself for the activation of your software.
        <br></br><br></br><br></br>
        If you wish, you can also do this Telephone activation online via this link:<a style={{color:"rgb(37 99 235 / 1)"}} href='https://bit.ly/2QrOxMU'>CLICK HERE</a> But this is a bit more difficult because you have to enter the numbers manually.
        <br></br><br></br><br></br>
        ————–
        </>
    },
    {
        question:'What is telephone activation (Windows)?',
        answer:<>Microsoft Key Market sometimes sells pre-owned licenses. This means that we sell licenses that were previously activated, but are no longer active due to hardware replacement or failure of the company. These licenses are then reactivated. Now it is possible that the re-activation was not successful via the Internet. These licenses then still work by re-activation over the phone. Select "Telephone activation" and follow the procedure.
        <br></br><br></br><br></br>
        —————-
        <br></br><br></br><br></br>
        You can click on the start button at the bottom left of your computer with your right mouse button, then click execute.
        <br></br><br></br><br></br>
        In the command window, type: SLUI 4 and press enter.
        <br></br>
        Then select the country and click on next.
        <br></br><br></br><br></br>
        You will then see the installation ID at the bottom of the screen. You can use the website below to enter the ID.
        <br></br><br></br><br></br>
        <a style={{color:"rgb(37 99 235 / 1)"}}  href='https://bit.ly/2QrOxMU'>https://bit.ly/2QrOxMU</a>
        <br></br><br></br><br></br>
        You can choose 7 Digits and then enter the installation ID that is visible on the computer. After entering, click on Next.
        <br></br><br></br><br></br>
        If all is well, he will now ask how many computers have Windows installed, enter 0 here.
        <br></br><br></br><br></br>
        When you click Next again you will see the confirmation ID. You can enter the confirmation ID on the computer after you click enter confirmation ID.
        <br></br><br></br><br></br>
        If this does not work you can also call the number of your country to activate Windows.
        <br></br><br></br><br></br>

        ————–
        </>
    },
    {
        question:'I want to upgrade from Windows 10/11 Home to Pro ?',
        answer:<>Upgrading from Windows 10 or 11 Home to Windows 10 or 11 Pro is not so obvious.
        <br></br><br></br><br></br>
        If you enter the purchased licence key in a Windows 10 or 11 Home, you will receive an error message because Microsoft does not allow this. 
        <br></br><br></br><br></br>
        However, there is an easy solution.
        <br></br><br></br><br></br>
        In Windows 10, go to settings - update and security - activation....
        <br></br>
        In Windows 11, go to settings - system - activation - upgrade

        <br></br><br></br><br></br>
        There you choose for "change product code".
        <br></br><br></br><br></br>
        Then enter one of these keys:
        <br></br><br></br><br></br>
        8DVY4-NV2MW-3CGTG-XCBDB-2PQFM
        <br></br><br></br><br></br>
        W269N-WFGWX-YVC9B-4J6C9-T83GX
        <br></br><br></br><br></br>
        VK7JG-NPHTM-C97JM-9MPGT-3V66T
        <br></br><br></br><br></br>
        6P99N-YF42M-TPGBG-9VMJP-YKHCF
        <br></br><br></br><br></br>
        <strong>IMPORTANT! TRY ALL 4 KEYS BUT AFTER EACH KEY ALWAYS REBOOT THE PC OR LAPTOP. EVEN IF YOU GET AN ERROR MESSAGE !</strong>
        <br></br><br></br><br></br>
        If your 4 keys did not work. Then try repeating the procedure, but without an Internet connection.

        <br></br><br></br><br></br>
        This key will start your upgrade to Windows 10/11 Pro. However, after this, your Windows Pro is not yet activated as these are generic public keys. Then repeat the steps above but with your purchased key. Your Windows Pro will then be activated.  
        </>
    },
    {
        question:`I'm having problems installing or activating Office`,
        answer:<>Most problems with the installation or activation of Office are caused by the fact that there is still an old or different Office version on your system. On a new laptop, for example, there is another trial version of Office 365 that conflicts with new versions.
        <br></br><br></br><br></br>
        Examples of errors :
        <br></br>
        For example, you will receive error code 30182-1 (2).
        <br></br>
        Office only wants to install 32-bit and gives you a notification
        <br></br>
        Your office question behind an email address for activation
        <br></br>
        You do not get Office activated or the key turns out to be incorrect.
        <br></br><br></br><br></br>
        All these errors can be solved by deleting old or other Office versions.
        <br></br><br></br><br></br>
        You can read how to do that here:
        <br></br><br></br><br></br>
        <a style={{color:"rgb(37 99 235 / 1)"}}  href='https://support.office.com/nl-nl/article/office-verwijderen-van-een-pc-9dd49b83-264a-477a-8fcc-2fdf5dbf61d8'>https://support.office.com/nl-nl/article/office-verwijderen-van-een-pc-9dd49b83-264a-477a-8fcc-2fdf5dbf61d8</a>
        <br></br><br></br><br></br>
        or for Mac : <a style={{color:"rgb(37 99 235 / 1)"}}  href='https://support.microsoft.com/nl-nl/office/problemen-met-office-voor-mac-oplossen-door-het-programma-volledig-te-verwijderen-voordat-je-het-opnieuw-installeert-ec3aa66e-6a76-451f-9d35-cba2e14e94c0'>https://support.microsoft.com/nl-nl/office/problemen-met-office-voor-mac-oplossen-door-het-programma-volledig-te-verwijderen-voordat-je-het-opnieuw-installeert-ec3aa66e-6a76-451f-9d35-cba2e14e94c0</a>
        <br></br><br></br><br></br>
        If you want to check if you are working with the correct Office version, go to File - Account and in the right column you will see your version of Office and the activation.
        </>
    },
    {
        question:'Can I reinstall the software (on the same or a different PC) ?',
        answer:<><strong>For Windows :</strong>
        <br></br><br></br><br></br>
        After entering your license key and activation, your Windows is automatically linked to your computer's Mac address. Microsoft creates a profile of your device. On the basis of this data, a new installation checks whether your device was already equipped (with an activated version) with Windows 10. You can then reinstall it as much as you want on the same computer. You cannot use the license key on another PC.
        <br></br><br></br><br></br>
        <strong>For Windows :</strong>
        <br></br><br></br><br></br>
        This depends on the type of license. Check the product description to see if the product is suitable for installation via an account or only valid for 1 PC.
        <br></br><br></br><br></br>
        You create an Office account at <a style={{color:"rgb(37 99 235 / 1)"}}  href='https://setup.office.com'>https://setup.office.com</a>
        and enter your license key. After this, your product will always be present in your Microsoft 
        Account. You can check this by going to <a style={{color:"rgb(37 99 235 / 1)"}}  href='https://account.microsoft.com/'>https://account.microsoft.com/</a> and clicking on 'services and subscriptions' at the top of the menu, then you will find your product and you can install it again. Attention, only 1 installation is possible, so you first have to uninstall your installation on the other computer
        <br></br><br></br><br></br>
        Attention : your original license key will no longer work if it is linked to your Microsoft Account and Microsoft will not allow a second use. You must therefore use your account for the reinstallation.
        <br></br><br></br><br></br>
        Attention, if you haven't created a Microsoft Account, you can't use your license key again to reinstall or activate it !
        <br></br><br></br><br></br>
        </>
    },
 
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
                        <h2 className={css.h2}>{item.question}</h2>
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