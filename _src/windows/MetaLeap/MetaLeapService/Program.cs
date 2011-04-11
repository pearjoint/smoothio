
using System;
using System.Collections.Generic;
using System.ServiceProcess;
using System.Text;

namespace MetaLeapService {

	public static class Program {

		public static void Main () {
			ServiceBase.Run (new ServiceBase [] { new MetaLeapService () });
		}

	}

}
