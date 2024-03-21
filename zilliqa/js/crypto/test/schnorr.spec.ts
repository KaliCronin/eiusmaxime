//  Copyright (C) 2018 Zilliqa
//
//  This file is part of zilliqa-js
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { BN } from "@zilliqa-js/util";
import { randomBytes } from "crypto";
import { ec } from "elliptic";
import { Signature } from "../src/index";
import { Buffer } from "buffer";

const schnorrVectors = [
  {
    msg: "A7F1D92A82C8D8FE434D98558CE2B347171198542F112D0558F56BD68807999248336241F30D23E55F30D1C8ED610C4B0235398184B814A29CB45A672ACAE548E9C5F1B0C4158AE59B4D39F6F7E8A105D3FEEDA5D5F3D9E45BFA6CC351E220AE0CE106986D61FF34A11E19FD3650E9B7818FC33A1E0FC02C44557AC8AB50C9B2DEB2F6B5E24C4FDD9F8867BDCE1FF261008E7897970E346207D75E47A158298E5BA2F56246869CC42E362A02731264E60687EF5309D108534F51F8658FB4F080B7CB19EE9AEBD718CC4FA27C8C37DFC1ADA5D133D13ABE03F021E9B1B78CCBD82F7FF2B38C6D48D01E481B2D4FAF7171805FD7F2D39EF4C4F19B9496E81DAB8193B3737E1B27D9C43957166441B93515E8F03C95D8E8CE1E1864FAAD68DDFC5932130109390B0F1FE5CA716805F8362E98DCCAADC86ADBED25801A9A9DCFA6264319DDAFE83A89C51F3C6D199D38DE10E660C37BE872C3F2B31660DE8BC95902B9103262CDB941F77376F5D3DBB7A3D5A387797FC4819A035ECA704CEDB37110EE7F206B0C8805AAEBF4963E7C4708CE8D4E092366E71792A8A3B2BBCDEE321B3E15380C541EF0930888969F7457AFE18588826A419D58311C1784B5484EECDB393F6A0ACA11B91DF0866B500B8DEE501FD7EB9BCE09A17D74124B4605ADFC0777BED9816D8D7E8488544A18D8045CB3283B0A752B881B5F500FADB59010E63D",
    pub: "039E43C9810E6CC09F46AAD38E716DAE3191629534967DC457D3A687D2E2CDDC6A",
    priv: "0F494B8312E8D257E51730C78F8FE3B47B6840C59AAAEC7C2EBE404A2DE8B25A",
    k: "532B2267C4A3054F380B3357339BDFB379E88366FE61B42ACA05F69BC3F6F54E",
    r: "3AF3D288E830E96FF8ED0769F45ABDA774CD989E2AE32EF9E985C8505F14FF98",
    s: "E191EB14A70B5B53ADA45AFFF4A04578F5D8BB2B1C8A22985EA159B53826CDE7",
  },
  {
    msg: "1B664F8BDA2DBF33CB6BE21C8EB3ECA9D9D5BF144C08E9577ED0D1E5E560875109B340980580473DBC2E689A3BE838E77A0A3348FE960EC9BF81DA36F1868CA5D24788FA4C0C778BF0D12314285495636516CF40861B3D737FD35DBB591C5B5D25916EB1D86176B14E0E67D2D03957F0CF6C87834BF328540588360BA7C7C5F88541634FB7BADE5F94FF671D1FEBDCBDA116D2DA779038ED7679896C29198B2657B58C50EA054F644F4129C8BA8D8D544B727633DD40754398046796E038626FEF9237CE5B615BC08677EE5ABFBD85F73F7F8868CB1B5FBA4C1309F16061AA133821FBE2A758D2BBE6AA040A940D41B7D3B869CEE945150AA4A40E6FF719EEC24B2681CD5CE06B50273436584066046656D5EFED7315759189D68815DDB9E5F8D7FD53B6EC096616A773B9421F6704CED36EF4E484BA0C6C5A4855C71C33A54AC82BE803E5CFD175779FC444B7E6AA9001EEFABEBC0CF99754887C7B0A27AFDDC415F8A02C5AF1EFEA26AD1E5D92B1E29A8FAF5B2186C3094F4A137BCFAA65D7B274214DB64C86F3085B24938E1832FB310A6F064181E298D23062ABC817BA173023C8C04C5C3A1ECBF4AF72372B381FF69865C8F0E3C70B931C45A7419B3C441842EBFACC3D070AC3B433CD120B6E85B72DADCF40B23B173C34F6BE1B1901F6621F1497B085CF8E999D986EF8FF3A889A0238979983A8686F69E10EF9249A87",
    pub: "0245DC2911EDC02F2774E0A40FBEB0112EA60BF513F9EC50889D59FC94C97EC18F",
    priv: "8D566BB87EF69FFDA622E0A59FBAAFE57F486CE65844343A5D9B97DE9C4F619A",
    k: "948AFFFF6E068CA2F2757BFD6085D6E4C3084B038E5533C5927ECB19EA0D329C",
    r: "DFEE66E2C4799E73F0F778126A23032608408C27C2E7B3FA45A626BB9BDEB53C",
    s: "75445CC9DBFE4E7BC64E020FA22CACFA4C40D5AA84DD6AEF661564FCA9746C40",
  },
  {
    msg: "3444C8501F19A8A78670F748FA401C4020AE086D7157A3837EC721DEF0D6E095928C5B78ED9B95560CE33D5B22778BE66DCEF2D21878D481DFF41A4DEDCAFDCAEAB4BD78629D7EC40FD26F1DD954CA84A3B53B84E9903056E840837A1390F37BB8ADE799DAC1E465D811916547EB4B6A163082E9833634A1224C54F681B8DC70A792C0CB4671D4970CCC80E2168CE920CC8FA07B1F90E9898D16019913ED5B8EE8A8DE7AB6F7895601FD20E49FD73E6F5D24C0D97E67871539F0E4E32CCB6677AFF03356D1F3790945E94039E51A63B3C840B74E3053D95CA71C0D3AC20A9065828D30AB5BFB6188A8F291FB1EB4E1EED03E2F5F558C00D8E3084120DEEB8BFE908429B36A896A45D624E79372CC18DF37DB2D20C9726D4FEF7BECF220138B53BC54C2DA461A9955AFF33F2F93DD96464BF3E883FC5750BDBE79BC2F82427F41DE42659AC4B111D7CEF8085003469DF8C9D3541480C6841707CE4C8F3D003AF982AD35C2733D0FA3B1EE52A6DAB36203D99AEC179A565B5050F480235C3BC560AA28EF5DD5525BFA254E584A86FDBD4BCC5B56551BAD00255CB72F806D7F3C533321B0864007AFBA4E0FF9638517FA8D788F52766F3A28C57C428BFDD4234AA760CE8044DF1E1FBA58E8B1D9C5A79D2AC4592FC31702F7E83351D2160C09C5CEA554F2C93A61C040E225612DF2B550900B097E18638350E3BA15C9AD53CE1861",
    pub: "02237627FE7374061FBD80AEA842DCE76D9206F0DDC7B319F3B30FA75DBD4F009A",
    priv: "009755F442D66585A10B80A49850C77764AD029D1BEA73F4DA45AB331306E6E5",
    k: "2D78C77B736AD0A00FDF60695C01E96520656C13DC890A5B864672C6CED1C49A",
    r: "4B73D4D919D7B4DEF330391899EA02023851CABE044E34E18EAE3E10588CECCD",
    s: "D5DE85C4BDEA5910DC36AEF5660774D65291322C1E87FDA0D00C864E8C5FED29",
  },
];

const pairs = [
  {
    private: "b776d8f068d11b3c3f5b94db0fb30efea05b73ddb9af1bbd5da8182d94245f0b",
    public:
      "04cfa555bb63231d167f643f1a23ba66e6ca1458d416ddb9941e95b5fd28df0ac513075403c996efbbc15d187868857e31cf7be4d109b4f8cb3fd40499839f150a",
    digest: "0e3e927f8be54eb20f4f47baa2f4d23649433591ea1b967127b971de2288609e",
  },
  {
    private: "24180e6b0c3021aedb8f5a86f75276ee6fc7ff46e67e98e716728326102e91c9",
    public:
      "04163fa604c65aebeb7048c5548875c11418d6d106a20a0289d67b59807abdd299d4cf0efcf07e96e576732dae122b9a8ac142214a6bc133b77aa5b79ba46b3e20",
    digest: "f5b2dfddfdbd0d13a67085a5ad5744c0c6246d9704592116fccbf41978fe99c8",
  },
  {
    private: "af71626e38926401a6d2fd8fdf91c97f785b8fb2b867e7f8a884351e59ee9aa6",
    public:
      "0485c34ff11ea1e06f44d35afe3cc1748b6b122bb06df021a4767db4ef5fbcf1cdbed73c821d89724b59a0fc5e2f2e3e1a9c121d698fff36d750ee463117438a14",
    digest: "f8b9842a5f695139d22f49d1f706173b76fe0b5f680779558f23635a35425154",
  },
  {
    private: "b94289721618d1a8100bea8502fee149bae7313fcbaebf5ad6a867d557e82971",
    public:
      "04c7d47ad99dd1db85c9d0b6abe89ffc137f230c991a33890c05436a14974543a29d58bc4655269db6bcd6ea27adca287f956355c64d676cefcfea14051b5239c9",
    digest: "f6dae5bbe10084a0afcf363d11b08e4f6941d09dfbd39ce6474e115ff7908e05",
  },
  {
    private: "c577711506abf9dbdabd09c5ae66492e77d6450e8d739ce6493728e781150236",
    public:
      "0484929ab70d2b39703319a94144802ea9b9a7c8c1a673b10f01738db5b5c40ea8f534bc21ef1b167ffcac7d1a087ed5be2a5d1fa720bc016fbfbd9fb869aee4c6",
    digest: "688c722f9c72cc4d760fd5967b3e26c3628bb4b3eb4b397ab7a2c3f26d312931",
  },
];

import * as schnorr from "../src/schnorr";

const secp256k1 = new ec("secp256k1");

describe("schnorr", () => {
  it("should fail for bad signatures", () => {
    schnorrVectors.forEach(({ priv, k }) => {
      const pub = secp256k1.keyFromPrivate(priv, "hex").getPublic(true, "hex");
      const badPrivateKey = pairs[0].private;

      const msg = randomBytes(128);

      let sig: Signature | null = null;
      while (!sig) {
        sig = schnorr.trySign(
          msg,
          new BN(k),
          new BN(Buffer.from(badPrivateKey, "hex")),
          Buffer.from(pub, "hex")
        );
      }

      const res = schnorr.verify(msg, sig, Buffer.from(pub, "hex"));
      expect(res).toBeFalsy();
    });
  });

  it("should not verify invalid public keys", () => {
    // invalid point for secp256k1
    const x =
      "c70dc2f79d407ae3800098eea06c50cd80948d15d209a73df6f6c2b31bb247d4";
    const y =
      "07132a5e43e331ac0b4cbec1d7318add7d25533d0dbee5cd5ded9fe9ddb4248a";
    const pubKey = "04" + x + y;

    // signature over the string 'test', for the invalid point (x,y) above
    const r =
      "e5d98c86e8b85e4c41d47c4ed50219adad544c57c1f75408477c475abcc5e7bc";
    const s =
      "de79ea11594f3dd3882fcc69a8413fa626a76df639a01c72dde9dc2d63c6d894";
    const signature = new Signature({ r, s });

    const res = () =>
      schnorr.verify(
        Buffer.from("test"),
        signature,
        Buffer.from(pubKey, "hex")
      );

    expect(res).toThrow("Invalid public key");
  });

  it("should match the C++ Schnorr implementation", () => {
    schnorrVectors.forEach(({ msg, priv, pub, k, r, s }) => {
      let sig: Signature | null = null;
      while (!sig) {
        sig = schnorr.trySign(
          Buffer.from(msg, "hex"),
          new BN(k, 16),
          new BN(Buffer.from(priv, "hex")),
          Buffer.from(pub, "hex")
        );
      }

      const res = schnorr.verify(
        Buffer.from(msg, "hex"),
        sig,
        Buffer.from(pub, "hex")
      );

      expect(sig.r.eq(new BN(r, 16))).toBe(true);
      expect(sig.s.eq(new BN(s, 16))).toBe(true);
      expect(res).toBe(true);
    });
  });
});
