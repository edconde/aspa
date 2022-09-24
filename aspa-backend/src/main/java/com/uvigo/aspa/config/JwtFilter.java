package com.uvigo.aspa.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.impl.TextCodec;

import org.springframework.http.HttpMethod;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(urlPatterns = { "/api/usuarios/*", "/api/tipos-prueba/*", "/api/competiciones/*", "/api/pruebas/*",
		"/api/atletas/*", "/api/clubes/*" })
public class JwtFilter implements Filter {

	private static final String secret = "aspakey";

	@Override
	public void init(final FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void doFilter(final ServletRequest req, final ServletResponse res, final FilterChain chain)
			throws IOException, ServletException {
		final HttpServletRequest request = (HttpServletRequest) req;
		final HttpServletResponse response = (HttpServletResponse) res;
		final String authHeader = request.getHeader("authorization");
		if (HttpMethod.OPTIONS.toString().equals(request.getMethod())) {
			response.setStatus(HttpServletResponse.SC_OK);
			chain.doFilter(req, res);
		} else if (this.avoidsAuthentication(request.getMethod(), request.getRequestURI())) {
			chain.doFilter(req, res);
		} else {
			if (authHeader == null || !authHeader.startsWith("Bearer ")) {
				response.setStatus(HttpServletResponse.SC_FORBIDDEN);
				return;
			}
			final String token = authHeader.substring(7);
			try {
				final Claims claims = Jwts.parser().setSigningKey(TextCodec.BASE64.encode(secret)).parseClaimsJws(token)
						.getBody();
				request.setAttribute("claims", claims);
			} catch (final JwtException e) {
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				return;
			}
			chain.doFilter(req, res);
		}
	}

	@Override
	public void destroy() {
	}

	private boolean avoidsAuthentication(String httpMethod, String url) {
		return httpMethod.equals(HttpMethod.GET.toString())
				&& !(url.startsWith("/api/usuarios") || url.startsWith("/api/atletas"));
	}

}
