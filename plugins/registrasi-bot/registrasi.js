
const nodemailer = require("nodemailer")
let timeout = 300000

let handler = async(m, {conn, text}) => {
    conn.sendMail = conn.sendMail ? conn.sendMail : {}
    let id = m.chat
    if (id in conn.sendMail) {
        conn.reply(m.chat, 'Silahkan cek kode otp pada emailmu. Jika email yang kamu masukkan salah kamu harus menunggu 5 menit agar bisa menggunakan ulang command ini', conn.sendMail[id][0])
        throw false
    }
    
    if(!text) throw "silahkan masukkan email anda!"
    const name = conn.getName(m.sender)
    var otp = Math.random();
        otp = otp * 1000000;
        otp = parseInt(otp);
        console.log(otp);
    
    const iniHtml = `
    <!DOCTYPE html>
    <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    
    <head>
    	<title></title>
    	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    	<style>
    		* {
    			box-sizing: border-box;
    		}
    
    		body {
    			margin: 0;
    			padding: 0;
    		}
    
    		a[x-apple-data-detectors] {
    			color: inherit !important;
    			text-decoration: inherit !important;
    		}
    
    		#MessageViewBody a {
    			color: inherit;
    			text-decoration: none;
    		}
    
    		p {
    			line-height: inherit
    		}
    
    		.desktop_hide,
    		.desktop_hide table {
    			mso-hide: all;
    			display: none;
    			max-height: 0px;
    			overflow: hidden;
    		}
    
    		.image_block img+div {
    			display: none;
    		}
    
    		.menu_block.desktop_hide .menu-links span {
    			mso-hide: all;
    		}
    
    		@media (max-width:700px) {
    
    			.image_block img.big,
    			.row-content {
    				width: 100% !important;
    			}
    
    			.menu-checkbox[type=checkbox]~.menu-links {
    				display: none !important;
    				padding: 5px 0;
    			}
    
    			.menu-checkbox[type=checkbox]:checked~.menu-trigger .menu-open {
    				display: none !important;
    			}
    
    			.menu-checkbox[type=checkbox]:checked~.menu-links,
    			.menu-checkbox[type=checkbox]~.menu-trigger {
    				display: block !important;
    				max-width: none !important;
    				max-height: none !important;
    				font-size: inherit !important;
    			}
    
    			.menu-checkbox[type=checkbox]~.menu-links>a,
    			.menu-checkbox[type=checkbox]~.menu-links>span.label {
    				display: block !important;
    				text-align: center;
    			}
    
    			.menu-checkbox[type=checkbox]:checked~.menu-trigger .menu-close {
    				display: block !important;
    			}
    
    			.mobile_hide {
    				display: none;
    			}
    
    			.stack .column {
    				width: 100%;
    				display: block;
    			}
    
    			.mobile_hide {
    				min-height: 0;
    				max-height: 0;
    				max-width: 0;
    				overflow: hidden;
    				font-size: 0px;
    			}
    
    			.desktop_hide,
    			.desktop_hide table {
    				display: table !important;
    				max-height: none !important;
    			}
    		}
    
    		#memu-r6c0m1:checked~.menu-links {
    			background-color: #000000 !important;
    		}
    
    		#memu-r6c0m1:checked~.menu-links a,
    		#memu-r6c0m1:checked~.menu-links span {
    			color: #ffffff !important;
    		}
    	</style>
    </head>
    
    <body style="background-color: #fff0e3; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff0e3;">
    		<tbody>
    			<tr>
    				<td>
    					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    						<tbody>
    							<tr>
    								<td>
    									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
    										<tbody>
    											<tr>
    												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
    													<div class="spacer_block block-1" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
    												</td>
    											</tr>
    										</tbody>
    									</table>
    								</td>
    							</tr>
    						</tbody>
    					</table>
    					<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    						<tbody>
    							<tr>
    								<td>
    									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
    										<tbody>
    											<tr>
    												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
    													<div class="spacer_block block-1" style="height:10px;line-height:10px;font-size:1px;">&#8202;</div>
    												</td>
    											</tr>
    										</tbody>
    									</table>
    								</td>
    							</tr>
    						</tbody>
    					</table>
    					<table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    						<tbody>
    							<tr>
    								<td>
    									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
    										<tbody>
    											<tr>
    												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
    													<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    														<tr>
    															<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
    																<div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7631/round_corner_top.png" style="display: block; height: auto; border: 0; width: 680px; max-width: 100%;" width="680" alt="Top round corners" title="Top round corners"></div>
    															</td>
    														</tr>
    													</table>
    												</td>
    											</tr>
    										</tbody>
    									</table>
    								</td>
    							</tr>
    						</tbody>
    					</table>
    					<table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    						<tbody>
    							<tr>
    								<td>
    									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
    										<tbody>
    											<tr>
    												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
    													<div class="spacer_block block-1" style="height:35px;line-height:35px;font-size:1px;">&#8202;</div>
    													<table class="heading_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    														<tr>
    															<td class="pad" style="text-align:center;width:100%;">
    																<h1 style="margin: 0; color: #101010; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 27px; font-weight: normal; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong>Email Verification</strong></h1>
    															</td>
    														</tr>
    													</table>
    												</td>
    											</tr>
    										</tbody>
    									</table>
    								</td>
    							</tr>
    						</tbody>
    					</table>
    					<table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    						<tbody>
    							<tr>
    								<td>
    									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
    										<tbody>
    											<tr>
    												<td class="column column-1" width="16.666666666666668%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
    													<div class="spacer_block block-1" style="height:0px;line-height:0px;font-size:1px;">&#8202;</div>
    												</td>
    												<td class="column column-2" width="66.66666666666667%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
    													<table class="text_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
    														<tr>
    															<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:10px;padding-top:10px;">
    																<div style="font-family: sans-serif">
    																	<div class style="font-size: 12px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21.6px; color: #848484; line-height: 1.8;">
    																		<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 25.2px;"><span style="font-size:14px;">hi ${name}<br />Confirm your email to be able to use ktdprjct Bot. Send this code to the bot and it will expire in 5 minutes.<br /><br /></span></p><h1 style="text-align: center">${otp}</h1>
    																	</div>
    																</div>
    															</td>
    														</tr>
    													</table>
    													<div class="spacer_block block-2" style="height:10px;line-height:10px;font-size:1px;">&#8202;</div>
    													<table class="button_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    														<tr>
    															<td class="pad">
    																<div class="alignment" align="center"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.example.com" style="height:43px;width:158px;v-text-anchor:middle;" arcsize="10%" strokeweight="0.75pt" strokecolor="#101" fillcolor="#101"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="www.example.com" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#101;border-radius:4px;width:auto;border-top:1px solid #101;font-weight:undefined;border-right:1px solid #101;border-bottom:1px solid #101;border-left:1px solid #101;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;">Verification</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
    															</td>
    														</tr>
    													</table>
    													<div class="spacer_block block-4" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
    												</td>
    												<td class="column column-3" width="16.666666666666668%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
    													<div class="spacer_block block-1" style="height:0px;line-height:0px;font-size:1px;">&#8202;</div>
    												</td>
    											</tr>
    										</tbody>
    									</table>
    								</td>
    							</tr>
    						</tbody>
    					</table>
    					<table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    						<tbody>
    							<tr>
    								<td>
    									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
    										<tbody>
    											<tr>
    												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
    													<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    														<tr>
    															<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
    																<div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7631/round_corner_bottom.png" style="display: block; height: auto; border: 0; width: 680px; max-width: 100%;" width="680" alt="Bottom round corners" title="Bottom round corners"></div>
    															</td>
    														</tr>
    													</table>
    												</td>
    											</tr>
    										</tbody>
    									</table>
    								</td>
    							</tr>
    						</tbody>
    					</table>
    					<table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    						<tbody>
    							<tr>
    								<td>
    									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
    										<tbody>
    											<tr>
    												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
    													<div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
    													<table class="menu_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    														<tr>
    															<td class="pad" style="color:#101010;font-family:inherit;font-size:14px;text-align:center;">
    																<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    																	<tr>
    																		<td class="alignment" style="text-align:center;font-size:0px;"><!--[if !mso]><!--><input class="menu-checkbox" id="memu-r6c0m1" type="checkbox" style="display:none !important;max-height:0;visibility:hidden;"><!--<![endif]-->
    																			<div class="menu-trigger" style="display:none;max-height:0px;max-width:0px;font-size:0px;overflow:hidden;"><label class="menu-label" for="memu-r6c0m1" style="height: 36px; width: 36px; display: inline-block; cursor: pointer; mso-hide: all; user-select: none; align: center; text-align: center; color: #ffffff; text-decoration: none; background-color: #000000; border-radius: 0;"><span class="menu-open" style="mso-hide:all;font-size:26px;line-height:31.5px;">☰</span><span class="menu-close" style="display:none;mso-hide:all;font-size:26px;line-height:36px;">✕</span></label></div>
    																			<div class="menu-links"><!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style=""><tr style="text-align:center;"><![endif]--><!--[if mso]><td style="padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px"><![endif]--><span class="label" style="mso-hide:false;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px;display:inline;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;color:false;letter-spacing:normal;">© 2023 ktdprjct. All rights reserved.</span><!--[if mso]></td><![endif]--><!--[if mso]></tr></table><![endif]--></div>
    																		</td>
    																	</tr>
    																</table>
    															</td>
    														</tr>
    													</table>
    												</td>
    											</tr>
    										</tbody>
    									</table>
    								</td>
    							</tr>
    						</tbody>
    					</table>
    				</td>
    			</tr>
    		</tbody>
    	</table><!-- End -->
    </body>
    
    </html>
`
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service : 'gmail',
        auth: {
            user: "ktdprjct@gmail.com",
            pass: "aoywlmxhtvtjoazj"
        }
    })
    
    const mailOptions = {
        from: '"ktdprjct"<ktdprjct@gmail.com>',
        to: text,
        subject: "Email Verification",
        html: iniHtml
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            console.log(error)
        } else {
            console.log("sukses " + info.response)
            conn.reply(m.chat, "sukses " + info.response, m)
        }
    })
    
    conn.sendMail[id] = {
        id: m.sender,
        email: text,
        otpCode: otp,
    }
    setTimeout(() => {
        delete conn.sendMail[id]
    }, timeout)
}
handler.help = ['reg']
handler.tags = ['regist']
handler.command = /^reg$/i

module.exports = handler