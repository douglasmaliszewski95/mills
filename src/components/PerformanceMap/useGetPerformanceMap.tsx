import { getFiliais } from "@/services/hooks/getFiliais";

export const useGetPerformanceMap = async () => {
  const content: any = await getFiliais("mapa_de_atuacao");
  console.log({ content });
  const markers = await extractLatLong(content);

  return { markers };
};

async function extractLatLong(data: any) {
  const result = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const locations = data[key];
      for (const location of locations) {
        const latitude = location.fields.latitude;
        const longitude = location.fields.longitude;
        const unitInfo = {
          address: location.fields.address,
          href: location.fields.href,
          name: location.fields.branch_name,
        };
        const visible = false;
        result.push({ latitude, longitude, unitInfo, visible });
      }
    }
  }

  return result;
}
