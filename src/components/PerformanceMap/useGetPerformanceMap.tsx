import { getFiliais } from "@/services/hooks/getFiliais";
import { getImage } from "@/services/hooks/getImage";
import { uniqueArrayValues } from "@/utils/formatArrInOrder";

export const useGetPerformanceMap = async () => {
  const contentImage: any = await getImage("mapa_atuacao");
  const content: any = await getFiliais("mapa_de_atuacao");
  const markers = await extractLatLong(content);
  const bannersResult = {
    src: contentImage?.main_banner[0].fields.native.links[0].href,
    srcMobile:
      contentImage?.main_banner[0].mobileObj.fields.native.links[0].href,
    title: contentImage?.main_banner[0].fields.content_title,
    id: contentImage?.main_banner[0].id,
  };
  const states: string[] = markers.map(
    (marker: any) => marker.unitInfo.name.split(",")[0]
  );
  const uniqueStates = uniqueArrayValues(states);

  return { markers, uniqueStates, bannersResult };
};

async function extractLatLong(data: any) {
  const result = [];
  let index = 0;

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const locations = data[key];
      for (const location of locations) {
        const latitude = location.fields.latitude;
        const longitude = location.fields.longitude;
        const markers = [parseFloat(latitude), parseFloat(longitude)];
        const freeDelivery = location.fields.delivery;
        const unitInfo = {
          address: location.fields.address,
          href: location.fields.href,
          name: location.fields.branch_name,
        };
        const visible = false;
        result.push({
          index,
          latitude,
          longitude,
          unitInfo,
          visible,
          markers,
          freeDelivery,
        });
      }
    }
  }

  return result;
}
