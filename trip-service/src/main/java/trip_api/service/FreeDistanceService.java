package trip_api.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import trip_api.dto.LatLon;
import trip_api.dto.NominatimResult;
import trip_api.dto.OSRMResponse;
import trip_api.entity.DistanceResult;

import java.util.Locale;

@Service
@Slf4j
public class FreeDistanceService {

    private final RestTemplate restTemplate;

    @Value("${api.locationiq.key:placeholder}")
    private String apiKey;

    private static final String BASE_URL = "https://us1.locationiq.com/v1";

    public FreeDistanceService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public LatLon geocode(String address) {
        String url = UriComponentsBuilder.fromUriString(BASE_URL + "/search.php")
                .queryParam("key", apiKey)
                .queryParam("q", address)
                .queryParam("format", "json")
                .queryParam("limit", 1)
                .queryParam("countrycodes", "ru")
                .build()
                .toUriString();

        log.info("Final URL: {}", url);

        try {
            NominatimResult[] results = restTemplate.getForObject(url, NominatimResult[].class);
            if (results != null && results.length > 0) {
                NominatimResult r = results[0];
                return new LatLon(Double.parseDouble(r.lat), Double.parseDouble(r.lon));
            }
        } catch (Exception e) {
            log.error("API error: {}", e.getMessage());
        }
        return fallbackCoords(address);
    }

    public DistanceResult getDistance(String origin, String destination) {
        LatLon o1 = geocode(origin);
        LatLon o2 = geocode(destination);
        return getDistance(o1.getLat(), o1.getLon(), o2.getLat(), o2.getLon());
    }

    public DistanceResult getDistance(double lat1, double lon1, double lat2, double lon2) {
        String url = String.format(Locale.US,
                "%s/directions/driving/%f,%f;%f,%f?key=%s&overview=false",
                BASE_URL, lon1, lat1, lon2, lat2, apiKey
        );

        try {
            OSRMResponse response = restTemplate.getForObject(url, OSRMResponse.class);
            if (response != null && response.routes != null && !response.routes.isEmpty()) {
                var route = response.routes.get(0);
                return new DistanceResult(route.distance / 1000.0, route.duration / 60.0);
            }
        } catch (Exception e) {
            log.error("LocationIQ Routing failed: {}", e.getMessage());
        }
        return new DistanceResult(10.0, 15.0);
    }

    private LatLon fallbackCoords(String address) {
        log.warn("Using fallback coordinates for: {}", address);
        String a = address.toLowerCase();
        if (a.contains("шереметьево")) return new LatLon(55.9728, 37.4124);
        if (a.contains("тверская")) return new LatLon(55.7597, 37.6090);
        return new LatLon(55.7558, 37.6173);
    }
}